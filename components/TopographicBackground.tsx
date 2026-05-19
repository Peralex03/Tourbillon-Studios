"use client";

import { useEffect, useRef } from "react";

/**
 * Altitude-contour topographic background.
 *
 * Draws nested closed organic curves · like the altitude lines on a topo map.
 * Each "ring" is a deformed loop centered around a slowly drifting focal point.
 * Curves breathe with slow time-based noise and warp gently toward the cursor.
 *
 * Performance:
 *  · DPR-aware canvas, fixed contour count
 *  · Single rAF loop
 *  · Disabled on mobile + prefers-reduced-motion
 */
export default function TopographicBackground({
  contourCount = 16,
  opacity = 0.14,
}: {
  contourCount?: number;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

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
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onMove(e: MouseEvent) {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });

    const t0 = performance.now();
    const SEGMENTS = 120;

    function ringNoise(theta: number, t: number, seed: number): number {
      return (
        Math.sin(theta * 2 + t * 0.18 + seed) * 18 +
        Math.sin(theta * 3.2 + t * 0.13 + seed * 1.7) * 12 +
        Math.sin(theta * 5.4 + t * 0.22 + seed * 2.3) * 7 +
        Math.sin(theta * 8.1 + t * 0.31 + seed * 3.1) * 3.5
      );
    }

    function tick(now: number) {
      if (!ctx) return;
      const time = (now - t0) / 1000;

      const ms = mouseSmoothed.current;
      const m = mouse.current;
      ms.x += (m.x - ms.x) * 0.06;
      ms.y += (m.y - ms.y) * 0.06;

      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = getStrokeColor();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const driftX = Math.sin(time * 0.06) * width * 0.05;
      const driftY = Math.cos(time * 0.07) * height * 0.05;
      const mouseShiftX = (ms.x - 0.5) * width * 0.18;
      const mouseShiftY = (ms.y - 0.5) * height * 0.18;
      const cx = width * 0.5 + driftX + mouseShiftX;
      const cy = height * 0.5 + driftY + mouseShiftY;

      const diag = Math.sqrt(width * width + height * height);
      const maxR = diag * 0.7;
      const warpRadius = Math.min(width, height) * 0.55;

      for (let r = 0; r < contourCount; r++) {
        const baseR = ((r + 0.5) / contourCount) * maxR;
        const seed = r * 1.37;
        const ringCx = cx + Math.sin(seed + time * 0.04) * 14;
        const ringCy = cy + Math.cos(seed * 1.3 + time * 0.05) * 14;

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
            warp = k * k * 22;
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
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [contourCount, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
