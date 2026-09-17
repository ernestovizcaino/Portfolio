"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/Section";
import type { WeatherDay, WeatherPayload } from "@/lib/family-trip/weather";
import { WeatherIcon } from "./WeatherIcon";

export function TripWeather({
  token,
  initial,
}: {
  token: string;
  initial: WeatherPayload | null;
}) {
  const [weather, setWeather] = useState(initial);

  useEffect(() => {
    if (weather) return;
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(
          `/api/family/weather?token=${encodeURIComponent(token)}`,
        );
        if (!res.ok) return;
        const data = (await res.json()) as WeatherPayload;
        if (!cancelled) setWeather(data);
      } catch {
        // keep empty
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, weather]);

  // The forecast covers the Córdoba stay, which may not have started yet —
  // only call a day "hoy" when it really is today over there.
  const days = weather?.days ?? [];
  const todayInCordoba = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Cordoba",
  }).format(new Date());
  const featuredIndex = Math.max(
    0,
    days.findIndex((d) => d.date >= todayInCordoba),
  );
  const featured = days[featuredIndex];
  const rest = days.filter((_, i) => i !== featuredIndex);

  return (
    <Section
      id="clima"
      label="Clima en Córdoba"
      intro="Cómo va a estar el tiempo allá. En septiembre allá es primavera, así que los días son templados y las noches frescas."
    >
      {!weather ? (
        <p className="reveal mt-8 text-sm text-[var(--ft-muted)]">
          Cargando el pronóstico…
        </p>
      ) : (
        <>
          {featured ? (
            <TodayCard
              day={featured}
              tip={weather.tip}
              isToday={featured.date === todayInCordoba}
            />
          ) : null}

          <ul className="reveal mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {rest.map((day) => (
              <li key={day.date} className="ft-card px-3 py-3 text-center">
                <p className="text-xs font-bold text-[var(--ft-muted)]">
                  {formatDay(day.date)}
                </p>
                <WeatherIcon
                  code={day.weatherCode}
                  className="mx-auto mt-1.5 h-11 w-11"
                />
                <p className="ft-display ft-stat-value mt-1.5 text-base text-[var(--ft-ink)]">
                  {Math.round(day.tempMaxC)}°
                  <span className="ml-1 text-sm font-semibold text-[var(--ft-faint)]">
                    {Math.round(day.tempMinC)}°
                  </span>
                </p>
                <p className="mt-0.5 text-[0.7rem] leading-tight text-[var(--ft-faint)]">
                  {day.precipMm > 0 ? `${day.precipMm.toFixed(1)} mm` : "sin lluvia"}
                </p>
              </li>
            ))}
          </ul>

          <p className="meta reveal mt-4">
            Pronóstico de Open-Meteo · se actualiza solo
          </p>
        </>
      )}
    </Section>
  );
}

function TodayCard({
  day,
  tip,
  isToday,
}: {
  day: WeatherDay;
  tip: string;
  isToday: boolean;
}) {
  return (
    <div className="ft-card reveal mt-8 overflow-hidden">
      <div className="flex items-center gap-4 px-5 py-5">
        <WeatherIcon code={day.weatherCode} className="h-20 w-20 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="label">
            {isToday ? "Hoy en Córdoba" : `${formatDay(day.date)} en Córdoba`}
          </p>
          <p className="ft-display mt-1 text-2xl leading-tight text-[var(--ft-ink)]">
            {day.label}
          </p>
          <p className="mt-1.5 text-sm text-[var(--ft-muted)]">
            Máxima{" "}
            <strong className="text-[var(--ft-ink)]">
              {Math.round(day.tempMaxC)}°
            </strong>{" "}
            · mínima{" "}
            <strong className="text-[var(--ft-ink)]">
              {Math.round(day.tempMinC)}°
            </strong>
            {day.precipMm > 0
              ? ` · ${day.precipMm.toFixed(1)} mm de lluvia`
              : " · sin lluvia"}
          </p>
        </div>
      </div>
      <div className="px-5 pb-5">
        <p className="ft-note">{tip}</p>
      </div>
    </div>
  );
}

function formatDay(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  return new Intl.DateTimeFormat("es-MX", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(date);
}
