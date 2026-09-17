"use client";

import { useEffect, useState } from "react";
import type { TravelerClock, TravelerClocks } from "@/lib/family-trip/status";
import { cn } from "@/lib/utils";

export function TripClocks({ clocks }: { clocks: TravelerClocks }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    // Align to the next minute boundary, then tick every minute.
    const msToNextMinute = 60_000 - (Date.now() % 60_000);
    let intervalId = 0;
    const timeoutId = window.setTimeout(() => {
      tick();
      intervalId = window.setInterval(tick, 60_000);
    }, msToNextMinute);
    // Also refresh shortly after mount so SSR/client don't look frozen.
    const nearId = window.setTimeout(tick, 1_000);
    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(nearId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className="reveal flex flex-wrap gap-3"
      aria-live="polite"
      aria-label="Relojes del viaje"
    >
      <ClockCard clock={clocks.primary} now={now} featured />
      {clocks.secondary ? (
        <ClockCard clock={clocks.secondary} now={now} />
      ) : null}
    </div>
  );
}

function ClockCard({
  clock,
  now,
  featured = false,
}: {
  clock: TravelerClock;
  now: Date;
  featured?: boolean;
}) {
  const time = formatClockTime(now, clock.timeZone);
  const date = formatClockDate(now, clock.timeZone);

  return (
    <article
      className={cn(
        "ft-card min-w-[11.5rem] flex-1 px-4 py-3 sm:min-w-[13rem]",
        featured && "ring-2 ring-[var(--ft-pink)]/35",
      )}
    >
      <span
        className={cn(
          "ft-pill !px-2.5 !py-0.5 !text-[0.65rem]",
          toneClass(clock.tone),
        )}
      >
        {clock.label}
      </span>
      <p
        className={cn(
          "ft-display mt-2 tabular-nums tracking-tight text-[var(--ft-ink)]",
          featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl",
        )}
      >
        {time}
      </p>
      <p className="mt-0.5 text-xs font-medium text-[var(--ft-faint)]">{date}</p>
      <p className="mt-2 text-xs leading-snug text-[var(--ft-muted)]">{clock.hint}</p>
    </article>
  );
}

function toneClass(tone: TravelerClock["tone"]): string {
  switch (tone) {
    case "sky":
      return "ft-pill-sky";
    case "lime":
      return "ft-pill-lime";
    case "yellow":
      return "ft-pill-yellow";
    case "pink":
      return "ft-pill-pink";
    case "lavender":
      return "ft-pill-lavender";
    case "mint":
      return "ft-pill-mint";
  }
}

function formatClockTime(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatClockDate(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    timeZone,
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}
