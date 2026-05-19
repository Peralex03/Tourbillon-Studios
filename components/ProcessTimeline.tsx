"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
  /** Which mockup SVG to render */
  mockup: "brief" | "build" | "preview" | "retouches";
}

interface Props {
  steps: Step[];
}

/**
 * Interactive process timeline with sticky scroll.
 * Left column: 4 step cards (sticky); right column: a sticky mockup that
 * cross-fades between the active step's illustration as the user scrolls.
 *
 * Active step is determined by scroll progress within this section.
 */
export default function ProcessTimeline({ steps }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 0 → steps.length - 1 mapped linearly
  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, steps.length]);
  const smoothIndex = useSpring(rawIndex, { stiffness: 80, damping: 22 });

  return (
    <div
      ref={sectionRef}
      // Total height: one viewport per step, so each step gets ~one screen of scroll
      style={{ height: `${steps.length * 80}vh` }}
      className="relative px-6 lg:px-10"
    >
      <div className="sticky top-24 lg:top-32 grid grid-cols-12 gap-6 lg:gap-10 max-w-[1400px] mx-auto">
        {/* Left · steps list with active highlight */}
        <div className="col-span-12 lg:col-span-5 space-y-6 lg:space-y-8">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} smoothIndex={smoothIndex} />
          ))}
        </div>

        {/* Right · sticky mockup canvas */}
        <div className="col-span-12 lg:col-span-7 hidden lg:block">
          <div className="glass rounded-lg aspect-[4/3] relative overflow-hidden">
            {steps.map((step, i) => (
              <MockupSlide
                key={i}
                index={i}
                smoothIndex={smoothIndex}
                mockup={step.mockup}
              />
            ))}
            {/* Step counter overlay */}
            <div className="absolute top-5 right-5 font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-dim)]">
              <StepCounter smoothIndex={smoothIndex} total={steps.length} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   STEP CARD · highlighted when active
   ============================================ */
function StepCard({
  step,
  index,
  smoothIndex,
}: {
  step: Step;
  index: number;
  smoothIndex: ReturnType<typeof useSpring>;
}) {
  // Distance from current scroll position to this step
  const distance = useTransform(smoothIndex, (v) => Math.abs(v - index - 0.5));
  const opacity = useTransform(distance, [0, 1.2], [1, 0.4]);
  const numberColor = useTransform(distance, [0, 0.8], [1, 0]);
  const numberOpacity = useTransform(numberColor, (v) =>
    v > 0.5 ? 1 : 0.45
  );

  return (
    <motion.div
      style={{ opacity }}
      className="grid grid-cols-[auto_1fr] gap-6 items-start py-4"
    >
      <motion.div
        style={{ opacity: numberOpacity }}
        className="text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-none text-[var(--accent)] tabular-nums"
      >
        {step.number}
      </motion.div>
      <div>
        <h3 className="text-[1.25rem] lg:text-[1.5rem] font-medium tracking-tight leading-snug">
          {step.title}
        </h3>
        <p className="mt-3 text-[var(--text-dim)] text-[0.9375rem] leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

function StepCounter({
  smoothIndex,
  total,
}: {
  smoothIndex: ReturnType<typeof useSpring>;
  total: number;
}) {
  const current = useTransform(smoothIndex, (v) =>
    Math.min(total, Math.max(1, Math.floor(v) + 1))
  );
  return (
    <span className="tabular-nums">
      <motion.span>{current}</motion.span> / {String(total).padStart(2, "0")}
    </span>
  );
}

/* ============================================
   MOCKUP SLIDE · cross-fades between SVGs
   ============================================ */
function MockupSlide({
  index,
  smoothIndex,
  mockup,
}: {
  index: number;
  smoothIndex: ReturnType<typeof useSpring>;
  mockup: Step["mockup"];
}) {
  const distance = useTransform(smoothIndex, (v) => Math.abs(v - index - 0.5));
  const opacity = useTransform(distance, [0, 0.5, 1.2], [1, 1, 0]);
  const scale = useTransform(distance, [0, 1.2], [1, 0.96]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center p-8 lg:p-12"
    >
      {mockup === "brief" && <BriefMockup />}
      {mockup === "build" && <BuildMockup />}
      {mockup === "preview" && <PreviewMockup />}
      {mockup === "retouches" && <RetouchesMockup />}
    </motion.div>
  );
}

/* ============================================
   SVG MOCKUPS · stylized illustrations
   ============================================ */
function BriefMockup() {
  return (
    <svg viewBox="0 0 420 320" className="w-full h-full" aria-hidden="true">
      {/* Two webcam tiles · video call */}
      <g>
        <rect x="40" y="50" width="160" height="110" rx="8" fill="var(--surface-2)" stroke="var(--stroke)" />
        <circle cx="120" cy="100" r="22" fill="var(--text-faint)" opacity="0.4" />
        <rect x="60" y="135" width="70" height="6" rx="3" fill="var(--text-dim)" opacity="0.5" />
      </g>
      <g>
        <rect x="220" y="50" width="160" height="110" rx="8" fill="var(--surface-2)" stroke="var(--stroke)" />
        <circle cx="300" cy="100" r="22" fill="var(--accent)" opacity="0.6" />
        <rect x="240" y="135" width="70" height="6" rx="3" fill="var(--text-dim)" opacity="0.5" />
      </g>
      {/* Document below */}
      <g>
        <rect x="40" y="190" width="340" height="100" rx="6" fill="var(--surface-1)" stroke="var(--stroke)" />
        <rect x="60" y="210" width="180" height="8" rx="2" fill="var(--text)" opacity="0.6" />
        <rect x="60" y="230" width="280" height="5" rx="2" fill="var(--text-dim)" opacity="0.5" />
        <rect x="60" y="244" width="250" height="5" rx="2" fill="var(--text-dim)" opacity="0.4" />
        <rect x="60" y="258" width="220" height="5" rx="2" fill="var(--text-dim)" opacity="0.4" />
        <rect x="60" y="272" width="160" height="5" rx="2" fill="var(--text-dim)" opacity="0.3" />
        <circle cx="350" cy="220" r="6" fill="var(--accent)" />
      </g>
    </svg>
  );
}

function BuildMockup() {
  return (
    <svg viewBox="0 0 420 320" className="w-full h-full" aria-hidden="true">
      {/* Browser chrome */}
      <rect x="20" y="30" width="380" height="260" rx="8" fill="var(--surface-2)" stroke="var(--stroke)" />
      <circle cx="40" cy="48" r="4" fill="var(--text-faint)" />
      <circle cx="55" cy="48" r="4" fill="var(--text-faint)" />
      <circle cx="70" cy="48" r="4" fill="var(--text-faint)" />
      <rect x="90" y="42" width="160" height="12" rx="6" fill="var(--surface-1)" />
      {/* Hero section */}
      <rect x="40" y="80" width="340" height="60" rx="4" fill="var(--surface-1)" />
      <rect x="60" y="98" width="180" height="10" rx="2" fill="var(--text)" opacity="0.7" />
      <rect x="60" y="115" width="120" height="6" rx="2" fill="var(--text-dim)" opacity="0.5" />
      <rect x="280" y="100" width="80" height="24" rx="12" fill="var(--accent)" />
      {/* Content sections */}
      <rect x="40" y="155" width="160" height="120" rx="4" fill="var(--surface-1)" />
      <rect x="60" y="175" width="100" height="8" rx="2" fill="var(--text)" opacity="0.6" />
      <rect x="60" y="192" width="120" height="4" rx="2" fill="var(--text-dim)" opacity="0.4" />
      <rect x="60" y="202" width="110" height="4" rx="2" fill="var(--text-dim)" opacity="0.4" />
      <rect x="60" y="212" width="80" height="4" rx="2" fill="var(--text-dim)" opacity="0.4" />
      <rect x="220" y="155" width="160" height="120" rx="4" fill="var(--surface-1)" />
      {/* "Building..." indicator */}
      <circle cx="290" cy="180" r="14" fill="none" stroke="var(--accent)" strokeWidth="2" strokeDasharray="44 44">
        <animateTransform attributeName="transform" type="rotate" from="0 290 180" to="360 290 180" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function PreviewMockup() {
  return (
    <svg viewBox="0 0 420 320" className="w-full h-full" aria-hidden="true">
      {/* URL bar with private link */}
      <rect x="20" y="20" width="380" height="32" rx="6" fill="var(--surface-1)" stroke="var(--stroke)" />
      <circle cx="40" cy="36" r="5" fill="var(--accent)" />
      <rect x="55" y="32" width="240" height="8" rx="2" fill="var(--text-dim)" opacity="0.6" />
      <rect x="320" y="28" width="65" height="16" rx="8" fill="var(--accent)" opacity="0.2" stroke="var(--accent)" />
      <text x="352" y="40" textAnchor="middle" fontSize="9" fill="var(--accent)" fontFamily="ui-monospace, monospace">LIVE</text>
      {/* Full site preview */}
      <rect x="20" y="64" width="380" height="226" rx="6" fill="var(--surface-2)" stroke="var(--stroke)" />
      {/* Mock site */}
      <rect x="40" y="84" width="340" height="14" rx="3" fill="var(--text)" opacity="0.6" />
      <rect x="40" y="106" width="220" height="6" rx="2" fill="var(--text-dim)" opacity="0.4" />
      <rect x="40" y="130" width="340" height="80" rx="4" fill="var(--surface-1)" />
      <rect x="60" y="150" width="120" height="6" rx="2" fill="var(--text)" opacity="0.5" />
      <rect x="60" y="165" width="80" height="4" rx="2" fill="var(--text-dim)" opacity="0.4" />
      <rect x="220" y="155" width="60" height="20" rx="10" fill="var(--accent)" />
      <rect x="40" y="220" width="105" height="50" rx="4" fill="var(--surface-1)" />
      <rect x="155" y="220" width="105" height="50" rx="4" fill="var(--surface-1)" />
      <rect x="270" y="220" width="110" height="50" rx="4" fill="var(--surface-1)" />
    </svg>
  );
}

function RetouchesMockup() {
  return (
    <svg viewBox="0 0 420 320" className="w-full h-full" aria-hidden="true">
      {/* Side-by-side: feedback messages */}
      <rect x="20" y="40" width="200" height="240" rx="8" fill="var(--surface-1)" stroke="var(--stroke)" />
      <rect x="40" y="65" width="80" height="8" rx="2" fill="var(--text-dim)" opacity="0.5" />
      {/* Message bubbles */}
      <g>
        <rect x="40" y="90" width="160" height="38" rx="8" fill="var(--surface-2)" />
        <rect x="50" y="100" width="120" height="4" rx="2" fill="var(--text-dim)" opacity="0.5" />
        <rect x="50" y="110" width="80" height="4" rx="2" fill="var(--text-dim)" opacity="0.5" />
        <rect x="50" y="120" width="100" height="4" rx="2" fill="var(--text-dim)" opacity="0.5" />
      </g>
      <g>
        <rect x="40" y="140" width="140" height="32" rx="8" fill="var(--surface-2)" />
        <rect x="50" y="150" width="100" height="4" rx="2" fill="var(--text-dim)" opacity="0.5" />
        <rect x="50" y="160" width="60" height="4" rx="2" fill="var(--text-dim)" opacity="0.5" />
      </g>
      <g>
        <rect x="40" y="184" width="150" height="32" rx="8" fill="var(--accent-soft)" stroke="var(--accent)" />
        <rect x="50" y="194" width="110" height="4" rx="2" fill="var(--accent)" opacity="0.7" />
        <rect x="50" y="204" width="70" height="4" rx="2" fill="var(--accent)" opacity="0.6" />
      </g>
      {/* Input */}
      <rect x="40" y="240" width="160" height="22" rx="11" fill="var(--surface-2)" stroke="var(--stroke)" />
      <rect x="50" y="248" width="60" height="6" rx="2" fill="var(--text-faint)" opacity="0.5" />
      <circle cx="190" cy="251" r="7" fill="var(--accent)" />

      {/* Right · preview with check marks */}
      <rect x="240" y="40" width="160" height="240" rx="8" fill="var(--surface-2)" stroke="var(--stroke)" />
      <rect x="260" y="60" width="120" height="14" rx="3" fill="var(--text)" opacity="0.6" />
      <g>
        <rect x="260" y="92" width="120" height="10" rx="2" fill="var(--text-dim)" opacity="0.5" />
        <circle cx="380" cy="97" r="7" fill="var(--success)" opacity="0.6" />
        <path d="M376 97 l3 3 l5 -5" stroke="var(--bg)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
      <g>
        <rect x="260" y="116" width="120" height="10" rx="2" fill="var(--text-dim)" opacity="0.5" />
        <circle cx="380" cy="121" r="7" fill="var(--success)" opacity="0.6" />
        <path d="M376 121 l3 3 l5 -5" stroke="var(--bg)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
      <g>
        <rect x="260" y="140" width="120" height="10" rx="2" fill="var(--text-dim)" opacity="0.5" />
        <circle cx="380" cy="145" r="7" fill="var(--success)" opacity="0.6" />
        <path d="M376 145 l3 3 l5 -5" stroke="var(--bg)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
      <g>
        <rect x="260" y="164" width="120" height="10" rx="2" fill="var(--text-dim)" opacity="0.5" />
        <circle cx="380" cy="169" r="7" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
      </g>
      <g>
        <rect x="260" y="188" width="100" height="10" rx="2" fill="var(--text-dim)" opacity="0.4" />
        <circle cx="380" cy="193" r="7" fill="none" stroke="var(--text-faint)" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
