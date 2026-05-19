"use client";

import { useEffect, useRef } from "react";

/**
 * Section-scoped altitude-contour topo accent.
 * Stronger and tighter than the global background.
 * Parent must have position: relative.
 */
export default function FeaturedTopo({
  contourCount = 11,
  opacity = 0.3,
}: {
  contourCount?: number;
  opacity?: number;
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

    const t0 = performance.now();
    const SEGMENTS = 96;

    function ringNoise(theta: number, t: number, seed: number): number {
      return (
        Math.sin(theta * 2 + t * 0.22 + seed) * 14 +
        Math.sin(theta * 3.5 + t * 0.16 + seed * 1.7) * 9 +
        Math.sin(theta * 5.7 + t * 0.27 + seed * 2.4) * 5 +
        Math.sin(theta * 8.5 + t * 0.36 + seed * 3.1) * 2.5
      );
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

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = getStrokeColor();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const driftX = Math.sin(time * 0.08) * width * 0.06;
      const driftY = Math.cos(time * 0.09) * height * 0.06;
      const mouseShiftX = (ms.x - 0.5) * width * 0.22;
      const mouseShiftY = (ms.y - 0.5) * height * 0.22;
      const cx = width * 0.5 + driftX + mouseShiftX;
      const cy = height * 0.5 + driftY + mouseShiftY;

      const diag = Math.sqrt(width * width + height * height);
      const maxR = diag * 0.75;
      const warpRadius = Math.min(width, height) * 0.65;

      for (let r = 0; r < contourCount; r++) {
        const baseR = ((r + 0.5) / contourCount) * maxR;
        const seed = r * 1.41;
        const ringCx = cx + Math.sin(seed + time * 0.05) * 10;
        const ringCy = cy + Math.cos(seed * 1.3 + time * 0.06) * 10;

        ctx.beginPath();

        for (let i = 0; i <= SEGMENTS; i++) {
          const theta = (i / SEGMENTS) * Math.PI * 2;
          const noise = ringNoise(theta, time, seed);

          const px = ringCx + Math.cos(theta) * (baseR + noise);
          const py = ringCy + Math.sin(theta) * (baseR + noise);
          const dx = px - ms.x * width;
          const dy = py - ms.y * height;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let warp = 0;
          if (dist < warpRadius) {
            const k = 1 - dist / warpRadius;
            warp = k * k * 24;
          }

          const radius = baseR + noise + warp;
          const x = ringCx + Math.cos(theta) * radius;
          const y = ringCy + Math.sin(theta) * radius;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.closePath();
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
  }, [contourCount, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    />
  );
}
