"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Live "Studio status" indicator based on Geneva local time.
 * Open: Mon-Fri 09:00 - 18:00 (Europe/Zurich)
 */
export default function StudioStatus() {
  const t = useTranslations("studioStatus");
  const [state, setState] = useState<{ open: boolean; key: "openGeneva" | "closedTomorrow" | "closedMonday" } | null>(null);

  useEffect(() => {
    function compute() {
      const now = new Date();
      // Always read weekday in en-GB to get a stable, locale-independent value
      const fmt = new Intl.DateTimeFormat("en-GB", {
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

      const isWeekday = ["mon", "tue", "wed", "thu", "fri"].includes(weekdayPart);
      const inHours = totalMin >= 9 * 60 && totalMin < 18 * 60;

      if (isWeekday && inHours) {
        setState({ open: true, key: "openGeneva" });
      } else if (weekdayPart === "fri" || weekdayPart === "sat" || weekdayPart === "sun") {
        setState({ open: false, key: "closedMonday" });
      } else if (isWeekday) {
        setState({ open: false, key: "closedTomorrow" });
      } else {
        setState({ open: false, key: "closedMonday" });
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
      {t(state.key)}
    </div>
  );
}
