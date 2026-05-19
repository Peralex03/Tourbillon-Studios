"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  as?: "button" | "a";
}

/**
 * Magnetic hover effect · the element pulls toward the cursor with subtle damping.
 */
export default function MagneticButton({
  children,
  className = "",
  strength = 0.25,
  onClick,
  href,
  as = "button",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.6 });

  // Inner content moves a bit more than the outer wrapper for depth
  const innerX = useTransform(springX, (v) => v * 0.5);
  const innerY = useTransform(springY, (v) => v * 0.5);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="inline-block"
    >
      {as === "a" && href ? (
        <motion.a
          href={href}
          style={{ x: innerX, y: innerY }}
          className={className}
        >
          {children}
        </motion.a>
      ) : (
        <motion.button
          type="button"
          onClick={onClick}
          style={{ x: innerX, y: innerY }}
          className={className}
        >
          {children}
        </motion.button>
      )}
    </motion.div>
  );
}
