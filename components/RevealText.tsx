"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, createElement } from "react";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

interface Props {
  children: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  splitBy?: "word" | "char";
  once?: boolean;
}

/**
 * Mask reveal animation · words/chars slide up from below a clipping mask.
 * Mimics the akis.studio hero reveal feel.
 */
export default function RevealText({
  children,
  as = "span",
  className = "",
  delay = 0,
  stagger = 0.04,
  splitBy = "word",
  once = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<HTMLElement>, {
    once,
    margin: "-10% 0px -10% 0px",
  });

  const parts =
    splitBy === "word" ? children.split(/(\s+)/) : Array.from(children);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const child: Variants = {
    hidden: { y: "110%" },
    visible: {
      y: "0%",
      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const content = parts.map((part, i) =>
    /^\s+$/.test(part) ? (
      <span key={`s${i}`}> </span>
    ) : (
      <span
        key={i}
        className="inline-block overflow-hidden align-bottom"
        style={{ paddingBottom: "0.04em" }}
      >
        <motion.span className="inline-block will-change-transform" variants={child}>
          {part}
        </motion.span>
      </span>
    )
  );

  // Use plain element + framer-motion's `m.create` not needed; we only need
  // animate variants on the wrapper, so the wrapper is a motion.div regardless,
  // and we override the rendered tag via React.createElement when needed.
  // For simplicity we render motion.span/div + leave heading semantics inside via prop.
  return createElement(
    motion[as] as React.ElementType,
    {
      ref,
      className,
      initial: "hidden",
      animate: inView ? "visible" : "hidden",
      variants: container,
    },
    content
  );
}
