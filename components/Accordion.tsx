"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index of the item that should be open initially (default: 0). Pass -1 to keep all closed. */
  initialOpen?: number;
}

/**
 * FAQ-style accordion with blur open/close transitions.
 * Built on top of Framer Motion AnimatePresence · replaces native <details>.
 */
export default function Accordion({ items, initialOpen = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(initialOpen);

  return (
    <div className="divide-y divide-[var(--stroke)] border-y border-[var(--stroke)]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <Row
            key={i}
            q={item.q}
            a={item.a}
            isOpen={isOpen}
            onToggle={() => setOpenIndex(isOpen ? -1 : i)}
          />
        );
      })}
    </div>
  );
}

function Row({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left py-5 flex items-start justify-between gap-6 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
      >
        <span className="text-[1rem] lg:text-[1.0625rem] text-[var(--text)] font-medium tracking-tight">
          {q}
        </span>
        <span
          className={[
            "shrink-0 mt-1 w-7 h-7 flex items-center justify-center rounded-full glass-subtle text-[var(--text-dim)] transition-all duration-300",
            isOpen
              ? "bg-[var(--accent)] text-[var(--accent-ink)] border-[var(--accent)] rotate-45"
              : "rotate-0",
          ].join(" ")}
          aria-hidden="true"
        >
          <Plus />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
            animate={{
              height: "auto",
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.3, delay: 0.05 },
                filter: { duration: 0.4, delay: 0.05 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              filter: "blur(10px)",
              transition: {
                height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.2 },
                filter: { duration: 0.25 },
              },
            }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[var(--text-dim)] text-[0.9375rem] leading-relaxed max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Plus(): ReactNode {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
