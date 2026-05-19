"use client";

import { useEffect, useRef } from "react";

/**
 * Real topographic iso-line background, section-scoped.
 *
 * Generates a 2D "altitude" field using layered noise (sum of sinusoids at
 * multiple frequencies), then extracts iso-lines via the marching squares
 * algorithm at several altitude thresholds.
 *
 * Result: irregular, multi-focal contour lines — like a real topographic map
 * (peaks, valleys, ridges) — that breathe slowly with time and warp toward
 * the cursor.
 *
 * Performance:
 *  · Fixed grid resolution (90×50 = 4500 cells × 7 levels per frame)
 *  · Pauses paint when section is off-screen (IntersectionObserver)
 *  · Auto-disabled on mobile + prefers-reduced-motion
 */
export default function FeaturedTopo({
  opacity = 0.22,
  /** Number of iso-line levels drawn between minVal and maxVal */
  levels = 8,
  /** Approx grid columns (computed per resize) */
  cols = 90,
  /** Approx grid rows (computed per resize) */
  rows = 50,
}: {
  opacity?: number;
  levels?: number;
  cols?: number;
  rows?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const isVisible = useRef(true);

  const mouse = useRef({ x: 0.5, y: 0.5 });
  const mouseSmoothed = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (reduceMotion || isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Pre-allocated field
    const field = new Float32Array(cols * rows);

    function getStrokeColor(): string {
      const root = document.documentElement;
      const theme = root.getAttribute("data-theme") || "dark";
      return theme === "light"
        ? `rgba(43, 32, 26, ${opacity})`
        : `rgba(245, 234, 216, ${opacity})`;
    }

    function resize() {
      if (!canvas || !parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top) / rect.height;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    io.observe(parent);

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    window.addEventListener("mousemove", onMove, { passive: true });

    const t0 = performance.now();

    /**
     * Multi-octave noise. Sum of sinusoids at different frequencies +
     * a slow drift in time. Gives a non-symmetric, multi-focal field.
     */
    function altitude(x: number, y: number, t: number, mx: number, my: number): number {
      // Normalize coords to ~0..1
      const u = x / cols;
      const v = y / rows;

      // Layered sinusoids — each pair produces interference patterns
      let a = 0;
      a += Math.sin(u * 5.3 + t * 0.18) * Math.cos(v * 4.1 - t * 0.13) * 0.55;
      a += Math.sin(u * 8.7 - t * 0.21) * Math.cos(v * 9.3 + t * 0.17) * 0.32;
      a += Math.sin((u + v) * 11.7 + t * 0.11) * 0.22;
      a += Math.cos((u - v) * 7.5 - t * 0.19) * 0.18;
      a += Math.sin(u * 13.4 + t * 0.27) * Math.sin(v * 11.1 - t * 0.23) * 0.12;

      // Mouse bump · a Gaussian peak at the cursor position raises the field
      const du = u - mx;
      const dv = v - my;
      const r2 = du * du + dv * dv;
      a += Math.exp(-r2 * 8) * 0.5;

      return a;
    }

    function tick(now: number) {
      if (!ctx) return;
      if (!isVisible.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const time = (now - t0) / 1000;

      const ms = mouseSmoothed.current;
      const m = mouse.current;
      ms.x += (m.x - ms.x) * 0.07;
      ms.y += (m.y - ms.y) * 0.07;

      // Fill altitude field
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          field[j * cols + i] = altitude(i, j, time, ms.x, ms.y);
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = getStrokeColor();

      const cellW = width / (cols - 1);
      const cellH = height / (rows - 1);

      // Iso-levels distributed in the altitude range
      // Field roughly spans [-1.5, 2.5], we sample a band that gives 5-9 visible contours.
      const minLevel = -0.8;
      const maxLevel = 1.5;
      const step = (maxLevel - minLevel) / (levels - 1);

      for (let n = 0; n < levels; n++) {
        const level = minLevel + n * step;

        ctx.beginPath();

        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const tl = field[j * cols + i];
            const tr = field[j * cols + (i + 1)];
            const br = field[(j + 1) * cols + (i + 1)];
            const bl = field[(j + 1) * cols + i];

            // Build the case index: TL=8, TR=4, BR=2, BL=1
            let idx = 0;
            if (tl > level) idx |= 8;
            if (tr > level) idx |= 4;
            if (br > level) idx |= 2;
            if (bl > level) idx |= 1;

            if (idx === 0 || idx === 15) continue;

            const x = i * cellW;
            const y = j * cellH;

            // Linear interpolation along each edge to find crossing point
            const interp = (v0: number, v1: number) => {
              const denom = v1 - v0;
              if (Math.abs(denom) < 1e-9) return 0.5;
              return (level - v0) / denom;
            };

            // Crossing offsets along the four edges
            const topX = x + interp(tl, tr) * cellW;
            const topY = y;
            const rightX = x + cellW;
            const rightY = y + interp(tr, br) * cellH;
            const botX = x + interp(bl, br) * cellW;
            const botY = y + cellH;
            const leftX = x;
            const leftY = y + interp(tl, bl) * cellH;

            switch (idx) {
              case 1: // BL above
              case 14: // all but BL above (inverse) — same segment
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(botX, botY);
                break;
              case 2: // BR above
              case 13: // all but BR
                ctx.moveTo(botX, botY);
                ctx.lineTo(rightX, rightY);
                break;
              case 3: // BL + BR
              case 12: // TL + TR
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(rightX, rightY);
                break;
              case 4: // TR
              case 11: // all but TR
                ctx.moveTo(topX, topY);
                ctx.lineTo(rightX, rightY);
                break;
              case 5: // TR + BL (saddle) — two segments
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(topX, topY);
                ctx.moveTo(botX, botY);
                ctx.lineTo(rightX, rightY);
                break;
              case 6: // TR + BR
              case 9: // TL + BL
                ctx.moveTo(topX, topY);
                ctx.lineTo(botX, botY);
                break;
              case 7: // all but TL above (or TL only below) — 1 segment top→left
              case 8: // TL only above — same
                ctx.moveTo(topX, topY);
                ctx.lineTo(leftX, leftY);
                break;
              case 10: // TL + BR (saddle)
                ctx.moveTo(topX, topY);
                ctx.lineTo(rightX, rightY);
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(botX, botY);
                break;
            }
          }
        }

        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      io.disconnect();
      ro.disconnect();
    };
  }, [opacity, levels, cols, rows]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
