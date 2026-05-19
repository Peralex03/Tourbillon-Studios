"use client";

import { useEffect, useRef } from "react";

/**
 * Animated SVG curves reacting to mouse position.
 * Inspired by landonorris.com background curves.
 * Desktop only · disabled below md breakpoint and for reduced-motion users.
 */
export default function MouseReactiveBackground() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0.5);
  const targetY = useRef(0.5);
  const currentX = useRef(0.5);
  const currentY = useRef(0.5);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (reduceMotion || isMobile) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    function onMove(e: MouseEvent) {
      targetX.current = e.clientX / window.innerWidth;
      targetY.current = e.clientY / window.innerHeight;
    }

    function tick() {
      // Damped easing toward target
      currentX.current += (targetX.current - currentX.current) * 0.06;
      currentY.current += (targetY.current - currentY.current) * 0.06;

      const dx = (currentX.current - 0.5) * 80;
      const dy = (currentY.current - 0.5) * 60;

      if (wrap) {
        wrap.style.setProperty("--mx", `${dx}px`);
        wrap.style.setProperty("--my", `${dy}px`);
      }

      rafId.current = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden -z-10"
      style={{
        // CSS custom props animated via JS for parallax
        ["--mx" as string]: "0px",
        ["--my" as string]: "0px",
      }}
    >
      {/* Layer 1 · soft accent glow following mouse */}
      <div
        className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] rounded-full opacity-[0.18] blur-[120px]"
        style={{
          background: "var(--accent)",
          transform:
            "translate(calc(-50% + var(--mx) * 1.8), calc(-50% + var(--my) * 1.8))",
          transition: "background 0.4s",
        }}
      />

      {/* Layer 2 · counter glow */}
      <div
        className="absolute top-[20%] right-[15%] w-[35vw] h-[35vw] rounded-full opacity-[0.10] blur-[100px]"
        style={{
          background: "var(--text)",
          transform: "translate(calc(var(--mx) * -1.2), calc(var(--my) * -1.2))",
        }}
      />

      {/* Layer 3 · flowing SVG curves */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        style={{
          transform: "translate(calc(var(--mx) * 0.6), calc(var(--my) * 0.6))",
        }}
      >
        <defs>
          <linearGradient id="line-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-fade-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--text)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--text)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="var(--text)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Flowing horizontal curves */}
        {[
          { y: 200, amp: 80, color: "url(#line-fade-2)", w: 1 },
          { y: 350, amp: 120, color: "url(#line-fade)", w: 1.2 },
          { y: 500, amp: 100, color: "url(#line-fade-2)", w: 1 },
          { y: 650, amp: 140, color: "url(#line-fade)", w: 0.8 },
          { y: 780, amp: 70, color: "url(#line-fade-2)", w: 1 },
        ].map((line, i) => (
          <path
            key={i}
            d={`M -100,${line.y} C 400,${line.y - line.amp} 1200,${line.y + line.amp} 1700,${line.y}`}
            stroke={line.color}
            strokeWidth={line.w}
            fill="none"
            style={{
              transform: `translate(calc(var(--mx) * ${0.3 + i * 0.15}), calc(var(--my) * ${0.2 + i * 0.1}))`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
