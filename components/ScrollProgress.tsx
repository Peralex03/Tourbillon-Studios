"use client";

import { useEffect, useRef } from "react";

/**
 * Thin terracotta progress bar at the very top of the viewport that fills
 * as the user scrolls down the page. Fixed above the header (z-50 < z-[60]).
 *
 * IMPORTANT - utilise `width` et NON `transform: scaleX()` / `will-change`.
 * Sur desktop Chromium, un sibling fixed avec `transform`/`will-change`
 * promu en compositing layer dédiée casse silencieusement le `backdrop-filter`
 * du header (la sampling region de Blink s'effondre). Width-based animation
 * reste sur le main thread mais ne crée pas de couche composite interférente.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      if (el) el.style.width = `${pct * 100}%`;
      raf = 0;
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 h-[2px] z-[60] pointer-events-none"
      style={{
        background: "var(--accent)",
        width: "0%",
      }}
      ref={ref}
    />
  );
}
