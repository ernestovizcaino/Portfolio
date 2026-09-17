import { Section } from "@/components/Section";
import { cordobaCity } from "@/data/family-trip";
import type { getPublicItinerary } from "@/lib/family-trip/status";

type Itinerary = ReturnType<typeof getPublicItinerary>;

export function TripDays({
  days,
  now,
}: {
  days: Itinerary["days"];
  now: Date;
}) {
  // "Today" is today in Córdoba — that's the calendar the trip runs on.
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: cordobaCity.timeZone,
  }).format(now);

  return (
    <Section
      id="dias"
      label="Día a día"
      intro="El plan de los nueve días. El día de hoy va marcado en amarillo."
    >
      <ol className="mt-8">
        {days.map((day) => {
          const isToday = day.date === today;
          const isPast = day.date < today;

          return (
            <li
              key={day.date}
              className={[
                "ft-day reveal pb-6",
                isToday ? "is-today" : "",
                isPast ? "is-past" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="ft-day-marker" aria-hidden>
                {Number(day.date.slice(8))}
              </span>

              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-bold text-[var(--ft-muted)]">
                  {day.weekday} {Number(day.date.slice(8))} de septiembre
                </p>
                {isToday ? <span className="ft-chip is-sun">Hoy</span> : null}
              </div>

              <h3 className="ft-display mt-1 text-lg leading-snug text-[var(--ft-ink)]">
                {day.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--ft-muted)]">
                {day.summary}
              </p>

              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {day.highlights.map((highlight) => (
                  <li key={highlight} className="ft-chip">
                    {highlight}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
