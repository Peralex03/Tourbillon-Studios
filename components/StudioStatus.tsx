"use client";

import { useEffect, useState } from "react";

/**
 * Live "Studio status" indicator based on Geneva local time.
 * Open: Mon-Fri 09:00 - 18:00 (Europe/Zurich)
 * Otherwise: "Reprise des envois demain" / "Reprise lundi"
 */
export default function StudioStatus() {
  const [state, setState] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    function compute() {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat("fr-CH", {
        timeZone: "Europe/Zurich",
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });
      const parts = fmt.formatToParts(now);
      const hourPart = parts.find((p) => p.type === "hour")?.value ?? "0";
      const minutePart = parts.find((p) => p.type === "minute")?.value ?? "0";
      const weekdayPart = (parts.find((p) => p.type === "weekday")?.value ?? "").toLowerCase();

      const hour = parseInt(hourPart, 10);
      const minute = parseInt(minutePart, 10);
      const totalMin = hour * 60 + minute;

      const isWeekday =
        weekdayPart.startsWith("lun") ||
        weekdayPart.startsWith("mar") ||
        weekdayPart.startsWith("mer") ||
        weekdayPart.startsWith("jeu") ||
        weekdayPart.startsWith("ven");
      const inHours = totalMin >= 9 * 60 && totalMin < 18 * 60;

      if (isWeekday && inHours) {
        setState({ open: true, label: "Studio ouvert · Genève" });
      } else if (isWeekday) {
        setState({ open: false, label: "Studio fermé · Reprise demain 09 h" });
      } else {
        setState({ open: false, label: "Studio fermé · Reprise lundi 09 h" });
      }
    }
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!state) return null;

  return (
    <div className="flex items-center gap-2 text-[0.6875rem] font-mono uppercase tracking-wider text-[var(--text-faint)]">
      <span
        className={[
          "inline-block w-1.5 h-1.5 rounded-full",
          state.open ? "bg-[var(--accent)] animate-pulse" : "bg-[var(--text-faint)]",
        ].join(" ")}
        aria-hidden="true"
      />
      {state.label}
    </div>
  );
}
