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
      className="grid gap-3 sm:grid-cols-2"
      aria-live="polite"
      aria-label="Relojes del viaje"
    >
      <ClockCard clock={clocks.primary} now={now} featured />
      {clocks.secondary ? (
        <ClockCard clock={clocks.secondary} now={now} />
      ) : (
        <HereClock now={now} />
      )}
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
  return (
    <Card
      chip={clock.label}
      chipTone={featured ? "is-grape" : ""}
      time={formatClockTime(now, clock.timeZone)}
      date={formatClockDate(now, clock.timeZone)}
      hint={clock.hint}
      featured={featured}
    />
  );
}

/** The viewer's own clock, so comparing the two takes no mental arithmetic. */
function HereClock({ now }: { now: Date }) {
  const [zone, setZone] = useState<string | null>(null);

  useEffect(() => {
    // Deferred: the viewer's zone is unknown on the server, so reading it
    // during the effect body would desync the first client render.
    const id = window.setTimeout(
      () => setZone(Intl.DateTimeFormat().resolvedOptions().timeZone),
      0,
    );
    return () => window.clearTimeout(id);
  }, []);

  if (!zone) return null;

  return (
    <Card
      chip="Su hora"
      chipTone=""
      time={formatClockTime(now, zone)}
      date={formatClockDate(now, zone)}
      hint="La hora donde usted está ahorita"
      featured={false}
    />
  );
}

function Card({
  chip,
  chipTone,
  time,
  date,
  hint,
  featured,
}: {
  chip: string;
  chipTone: string;
  time: string;
  date: string;
  hint: string;
  featured: boolean;
}) {
  return (
    <article
      className={cn(
        "ft-card flex items-center gap-4 px-4 py-3.5",
        featured && "border-[color-mix(in_srgb,var(--ft-grape-deep)_35%,transparent)]",
      )}
    >
      <div className="min-w-0 flex-1">
        <span className={cn("ft-chip", chipTone)}>{chip}</span>
        <p className="mt-2 text-xs leading-snug text-[var(--ft-muted)]">{hint}</p>
      </div>
      <div className="shrink-0 text-right">
        <p
          className={cn(
            "ft-display ft-stat-value leading-none text-[var(--ft-ink)]",
            featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl",
          )}
        >
          {time}
        </p>
        <p className="mt-1 text-xs font-medium text-[var(--ft-faint)]">{date}</p>
      </div>
    </article>
  );
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
