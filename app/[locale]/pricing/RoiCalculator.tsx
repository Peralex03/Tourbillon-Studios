"use client";

import { useMemo, useState } from "react";

interface Props {
  visitorsLabel: string;
  avgValueLabel: string;
  currentRateLabel: string;
  resultLabel: string;
  resultNote: string;
}

export default function RoiCalculator({
  visitorsLabel,
  avgValueLabel,
  currentRateLabel,
  resultLabel,
  resultNote,
}: Props) {
  const [visitors, setVisitors] = useState(2500);
  const [avgValue, setAvgValue] = useState(800);
  const [currentRate, setCurrentRate] = useState(1.5);

  const monthlyGain = useMemo(() => {
    // Current revenue: visitors * (currentRate/100) * avgValue
    // After +34% conversion improvement
    const currentRevenue = visitors * (currentRate / 100) * avgValue;
    const improved = visitors * ((currentRate * 1.34) / 100) * avgValue;
    return Math.max(0, Math.round(improved - currentRevenue));
  }, [visitors, avgValue, currentRate]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
      {/* Inputs */}
      <div className="lg:col-span-3 space-y-7">
        <Field
          label={visitorsLabel}
          value={visitors}
          onChange={setVisitors}
          min={100}
          max={100000}
          step={100}
          format={(v) => v.toLocaleString("fr-CH")}
        />
        <Field
          label={avgValueLabel}
          value={avgValue}
          onChange={setAvgValue}
          min={50}
          max={10000}
          step={50}
          format={(v) => `${v.toLocaleString("fr-CH")} CHF`}
        />
        <Field
          label={currentRateLabel}
          value={currentRate}
          onChange={setCurrentRate}
          min={0.5}
          max={10}
          step={0.1}
          format={(v) => `${v.toFixed(1)} %`}
        />
      </div>

      {/* Result */}
      <div className="lg:col-span-2 p-8 lg:p-10 bg-[var(--surface-1)] border border-[var(--stroke)] rounded-sm flex flex-col justify-center">
        <div className="text-eyebrow mb-4">{resultLabel}</div>
        <div className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-tight text-[var(--accent)]">
          +{monthlyGain.toLocaleString("fr-CH")}
        </div>
        <div className="font-mono text-[0.75rem] uppercase tracking-wider text-[var(--text-dim)] mt-2">
          CHF / mois
        </div>
        <p className="mt-6 text-[0.8125rem] text-[var(--text-faint)] leading-relaxed">
          {resultNote}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="text-[0.875rem] text-[var(--text-dim)]">{label}</label>
        <span className="font-mono text-[0.95rem] text-[var(--text)]">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none h-1 bg-[var(--stroke)] rounded-full accent-[var(--accent)] cursor-pointer focus:outline-none"
        style={{
          background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${
            ((value - min) / (max - min)) * 100
          }%, var(--stroke) ${((value - min) / (max - min)) * 100}%, var(--stroke) 100%)`,
        }}
      />
    </div>
  );
}
