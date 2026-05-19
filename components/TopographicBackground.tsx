"use client";

import { useEffect, useRef } from "react";

/**
 * Topographic mouse-reactive background.
 *
 * Renders flowing contour lines (like a topo map) on an HTML canvas.
 * Lines have an organic baseline motion (slow sine waves) and react fluidly
 * to mouse position · pulled towards the cursor like a magnetic field.
 *
 * Performance:
 *  - DPR-aware canvas, fixed line count
 *  - Single rAF loop, throttled redraws
 *  - Disabled on mobile + prefers-reduced-motion
 */
export default function TopographicBackground({
  intensity = 1,
  lineCount = 14,
  opacity = 0.16,
}: {
  /** Multiplier for amplitude (default 1) */
  intensity?: number;
  /** Number of horizontal contour lines */
  lineCount?: number;
  /** Stroke opacity 0-1 */
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  // Mouse state
  const mouse = useRef({ x: 0.5, y: 0.5, active: false });
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
      // Use a custom stroke value visible against bg
      return theme === "light"
        ? `rgba(26, 22, 20, ${opacity})`
        : `rgba(242, 237, 228, ${opacity * 1.2})`;
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
      mouse.current.active = true;
    }

    function onLeave() {
      mouse.current.active = false;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    let t0 = performance.now();

    function tick(now: number) {
      if (!ctx) return;
      const time = (now - t0) / 1000;

      // Smooth mouse motion towards target (light damping)
      const ms = mouseSmoothed.current;
      const m = mouse.current;
      ms.x += (m.x - ms.x) * 0.08;
      ms.y += (m.y - ms.y) * 0.08;

      // Clear
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = getStrokeColor();

      // Resolution along x · finer => smoother curves but more cost
      const segments = 64;
      const stepX = width / segments;

      // Mouse-driven warp parameters
      const mouseAffectRadius = Math.min(width, height) * 0.45;
      const mouseStrength = 60 * intensity; // pixels max displacement

      for (let line = 0; line < lineCount; line++) {
        // Distribute lines vertically with breathing room outside viewport
        const linePos = (line + 0.5) / lineCount; // 0..1
        const baseY = linePos * height * 1.1 - height * 0.05;

        // Per-line phase to avoid mirror symmetry
        const phase = line * 0.7;
        const ampBase = 14 + (line % 3) * 6;

        ctx.beginPath();

        for (let i = 0; i <= segments; i++) {
          const x = i * stepX;

          // Organic base motion · layered sines
          const wave =
            Math.sin(x * 0.0035 + time * 0.18 + phase) * ampBase +
            Math.sin(x * 0.011 + time * 0.32 + phase * 1.6) * (ampBase * 0.4);

          // Mouse warp · pull lines towards/away from cursor
          const mx = ms.x * width;
          const my = ms.y * height;
          const dx = x - mx;
          const dy = baseY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let warp = 0;
          if (dist < mouseAffectRadius) {
            // Falloff
            const k = 1 - dist / mouseAffectRadius;
            const ke = k * k * k; // ease-cubic
            // Pull vertically towards cursor, modulated by signed dy
            warp = -dy * ke * 0.45;
            // Subtle horizontal-driven amplification of wave
            warp *= 0.6 + 0.4 * Math.cos(dx * 0.003);
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

    // Re-read theme color when theme toggles
    const themeObserver = new MutationObserver(() => {
      // Forces redraw via natural rAF; no action needed
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      themeObserver.disconnect();
    };
  }, [intensity, lineCount, opacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
