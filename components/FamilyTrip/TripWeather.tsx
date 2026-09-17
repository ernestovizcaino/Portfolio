"use client";

import { useEffect, useState } from "react";
import { Section } from "@/components/Section";
import type { WeatherPayload } from "@/lib/family-trip/weather";
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

  return (
    <Section
      id="clima"
      label="Clima en Córdoba"
      intro="Pronóstico con solcitos, nubes y gotitas — Open-Meteo. Puede cambiar, revisen cada mañana."
    >
      {!weather ? (
        <p className="reveal mt-6 text-sm text-[var(--ft-muted)]">
          Cargando el clima argentino…
        </p>
      ) : (
        <>
          <p className="reveal mt-6 rounded-2xl bg-[var(--ft-yellow)]/70 px-4 py-3 text-sm font-medium text-[var(--ft-ink)] shadow-[var(--ft-shadow-soft)]">
            {weather.tip}
          </p>
          <ul className="reveal mt-6 grid gap-3 sm:grid-cols-2">
            {weather.days.map((day) => (
              <li key={day.date} className="ft-weather-day flex items-center gap-3 px-3 py-3">
                <WeatherIcon code={day.weatherCode} className="h-14 w-14 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="ft-display text-sm text-[var(--ft-ink)]">
                    {formatDay(day.date)}
                  </p>
                  <p className="text-sm text-[var(--ft-muted)]">{day.label}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="ft-pill ft-pill-sky !px-2 !py-0.5 !text-[0.65rem] !shadow-none">
                      {Math.round(day.tempMinC)}° / {Math.round(day.tempMaxC)}°
                    </span>
                    {day.precipMm > 0 ? (
                      <span className="ft-pill ft-pill-lavender !px-2 !py-0.5 !text-[0.65rem] !shadow-none">
                        {day.precipMm.toFixed(1)} mm
                      </span>
                    ) : (
                      <span className="ft-pill ft-pill-lime !px-2 !py-0.5 !text-[0.65rem] !shadow-none">
                        seco
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
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
