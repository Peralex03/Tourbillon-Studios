"use client";

import { useEffect, useRef } from "react";

/**
 * Real topographic iso-line background · section-scoped, responsive density.
 *
 * Grid resolution adapts to viewport so line spacing stays constant in pixels
 * regardless of screen size. Noise function uses pixel-space coordinates so
 * contours look the same density on any device.
 *
 * Marching squares extracts iso-lines at multiple altitude levels.
 */
export default function FeaturedTopo({
  opacity = 0.22,
  /** Number of iso-line levels — more = denser contours */
  levels = 7,
  /** Target grid cell size in pixels (smaller = tighter resolution) */
  cellSize = 12,
  /** Approx pixel wavelength between major topographic features */
  wavelength = 280,
  /** Soft fade-out at top and bottom edges (linear-gradient mask) */
  fade = false,
}: {
  opacity?: number;
  levels?: number;
  cellSize?: number;
  wavelength?: number;
  fade?: boolean;
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
    let cols = 0;
    let rows = 0;
    let field: Float32Array = new Float32Array(0);

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

      // Adapt grid to viewport size so cell pixel size stays roughly constant
      cols = Math.max(16, Math.ceil(width / cellSize));
      rows = Math.max(12, Math.ceil(height / cellSize));
      field = new Float32Array(cols * rows);
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
    const TWO_PI = Math.PI * 2;

    /**
     * Layered noise. Inputs are in pixel-space (px, py) so the spatial
     * frequency stays constant regardless of viewport.
     */
    function altitude(px: number, py: number, t: number, mx: number, my: number): number {
      // Wavelength → angular frequency
      const k = TWO_PI / wavelength;
      const fx = px * k;
      const fy = py * k;

      // Looser, calmer noise · fewer harmonics, lower frequencies
      let a = 0;
      a += Math.sin(fx * 0.55 + t * 0.14) * Math.cos(fy * 0.50 - t * 0.10) * 0.70;
      a += Math.sin(fx * 0.95 - t * 0.18) * Math.cos(fy * 1.02 + t * 0.13) * 0.32;
      a += Math.sin((fx + fy) * 0.70 + t * 0.08) * 0.18;

      // Mouse bump · Gaussian peak at cursor (in viewport-relative coords)
      const u = px / width;
      const v = py / height;
      const du = u - mx;
      const dv = v - my;
      const r2 = du * du + dv * dv;
      a += Math.exp(-r2 * 10) * 0.45;

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

      const cellW = width / (cols - 1);
      const cellH = height / (rows - 1);

      // Fill altitude field
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const px = i * cellW;
          const py = j * cellH;
          field[j * cols + i] = altitude(px, py, time, ms.x, ms.y);
        }
      }

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = getStrokeColor();

      const minLevel = -0.7;
      const maxLevel = 1.3;
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

            let idx = 0;
            if (tl > level) idx |= 8;
            if (tr > level) idx |= 4;
            if (br > level) idx |= 2;
            if (bl > level) idx |= 1;

            if (idx === 0 || idx === 15) continue;

            const x = i * cellW;
            const y = j * cellH;

            const interp = (v0: number, v1: number) => {
              const denom = v1 - v0;
              if (Math.abs(denom) < 1e-9) return 0.5;
              return (level - v0) / denom;
            };

            const topX = x + interp(tl, tr) * cellW;
            const topY = y;
            const rightX = x + cellW;
            const rightY = y + interp(tr, br) * cellH;
            const botX = x + interp(bl, br) * cellW;
            const botY = y + cellH;
            const leftX = x;
            const leftY = y + interp(tl, bl) * cellH;

            switch (idx) {
              case 1:
              case 14:
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(botX, botY);
                break;
              case 2:
              case 13:
                ctx.moveTo(botX, botY);
                ctx.lineTo(rightX, rightY);
                break;
              case 3:
              case 12:
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(rightX, rightY);
                break;
              case 4:
              case 11:
                ctx.moveTo(topX, topY);
                ctx.lineTo(rightX, rightY);
                break;
              case 5:
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(topX, topY);
                ctx.moveTo(botX, botY);
                ctx.lineTo(rightX, rightY);
                break;
              case 6:
              case 9:
                ctx.moveTo(topX, topY);
                ctx.lineTo(botX, botY);
                break;
              case 7:
              case 8:
                ctx.moveTo(topX, topY);
                ctx.lineTo(leftX, leftY);
                break;
              case 10:
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
  }, [opacity, levels, cellSize, wavelength]);

  const fadeMask = fade
    ? "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)"
    : undefined;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
      style={
        fadeMask
          ? {
              maskImage: fadeMask,
              WebkitMaskImage: fadeMask,
            }
          : undefined
      }
    />
  );
}
