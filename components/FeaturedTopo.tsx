"use client";

import { useEffect, useRef } from "react";

/**
 * Section-scoped topographic accent layer.
 * Absolutely positioned inside its parent (parent must be position: relative).
 * Stronger than the global background · used on header bandeau, footer, CTA sections.
 *
 * Performance:
 *  - Only paints when section is intersecting the viewport
 *  - Auto-disabled on mobile + prefers-reduced-motion
 */
export default function FeaturedTopo({
  lineCount = 10,
  opacity = 0.32,
}: {
  lineCount?: number;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const isVisible = useRef(true);

  // Section-local mouse position (0..1 relative to canvas bounds)
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

    function getStrokeColor(): string {
      const root = document.documentElement;
      const theme = root.getAttribute("data-theme") || "dark";
      return theme === "light"
        ? `rgba(26, 22, 20, ${opacity})`
        : `rgba(242, 237, 228, ${opacity})`;
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

    let t0 = performance.now();

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

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = getStrokeColor();

      const segments = 56;
      const stepX = width / segments;
      const mouseAffectRadius = Math.min(width, height) * 0.5;
      const mouseStrength = 50;

      for (let line = 0; line < lineCount; line++) {
        const linePos = (line + 0.5) / lineCount;
        const baseY = linePos * height * 1.15 - height * 0.075;

        const phase = line * 0.55;
        const ampBase = 10 + (line % 3) * 5;

        ctx.beginPath();

        for (let i = 0; i <= segments; i++) {
          const x = i * stepX;

          const wave =
            Math.sin(x * 0.004 + time * 0.22 + phase) * ampBase +
            Math.sin(x * 0.013 + time * 0.38 + phase * 1.7) * (ampBase * 0.45);

          const mx = ms.x * width;
          const my = ms.y * height;
          const dx = x - mx;
          const dy = baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let warp = 0;
          if (dist < mouseAffectRadius) {
            const k = 1 - dist / mouseAffectRadius;
            const ke = k * k * k;
            warp = -dy * ke * 0.5;
            warp *= 0.6 + 0.4 * Math.cos(dx * 0.004);
            warp = Math.max(-mouseStrength, Math.min(mouseStrength, warp));
          }

          const y = baseY + wave + warp;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
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
  }, [lineCount, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
