import { Section } from "@/components/Section";
import type { getPublicItinerary } from "@/lib/family-trip/status";

type Itinerary = ReturnType<typeof getPublicItinerary>;
type Flight = Itinerary["flights"][number];

export function TripItinerary({ data }: { data: Itinerary }) {
  const outbound = data.flights.filter((f) => f.direction === "outbound");
  const inbound = data.flights.filter((f) => f.direction === "return");

  return (
    <>
      <Section
        id="vuelos"
        label="Vuelos"
        intro="Ida y vuelta con horarios locales. Sin GPS personal — solo el itinerario (y un avioncito bonito)."
      >
        <FlightGroup title="Ida · SLP → Córdoba" tone="outbound" flights={outbound} />
        <FlightGroup
          title="Regreso · Córdoba → SLP"
          tone="return"
          flights={inbound}
          className="mt-10"
        />
      </Section>

      <div className="mt-20">
        <Section
          id="lugares"
          label="En Córdoba"
          intro="Hotel, conferencia y la cena pendiente de confirmar."
        >
          <ul className="mt-8 space-y-4">
            {data.places.map((place, i) => (
              <li key={place.id} className="ft-card reveal px-4 py-4">
                <span
                  className={
                    i % 3 === 0
                      ? "ft-pill ft-pill-sky"
                      : i % 3 === 1
                        ? "ft-pill ft-pill-lime"
                        : "ft-pill ft-pill-pink"
                  }
                >
                  {place.role}
                </span>
                <a
                  href={place.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ft-display mt-3 block text-lg text-[var(--ft-ink)] underline-offset-4 hover:underline"
                >
                  {place.name}
                </a>
                <p className="mt-1 text-sm text-[var(--ft-muted)]">{place.address}</p>
                {place.notes?.length ? (
                  <ul className="mt-2 space-y-1 text-sm text-[var(--ft-muted)]">
                    {place.notes.map((note) => (
                      <li key={note}>· {note}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="reveal mt-8 ft-card px-4 py-4">
            <span className="ft-pill ft-pill-yellow">Traslado llegada</span>
            <p className="mt-3 text-sm font-medium text-[var(--ft-ink)]">
              {data.transfer.label} · recogida ~06:50 · {data.transfer.destination}
            </p>
            <p className="mt-1 text-sm text-[var(--ft-muted)]">
              Cotizado ~ARS {data.transfer.quotedPriceArs.toLocaleString("es-MX")}.{" "}
              {data.transfer.note}
            </p>
          </div>
        </Section>
      </div>

      <div className="mt-20">
        <Section
          id="dias"
          label="Día a día"
          intro="Del 19 al 27 de septiembre de 2026 — el plan familiar sin drama."
        >
          <ol className="mt-8 space-y-4">
            {data.days.map((day, i) => (
              <li key={day.date} className="ft-card reveal px-4 py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={
                      i % 4 === 0
                        ? "ft-pill ft-pill-lavender"
                        : i % 4 === 1
                          ? "ft-pill ft-pill-sky"
                          : i % 4 === 2
                            ? "ft-pill ft-pill-lime"
                            : "ft-pill ft-pill-pink"
                    }
                  >
                    {day.weekday} · {day.date.slice(8)} sep
                  </span>
                </div>
                <h3 className="ft-display mt-3 text-lg text-[var(--ft-ink)]">
                  {day.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--ft-muted)]">
                  {day.summary}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-[var(--ft-muted)]">
                  {day.highlights.map((h) => (
                    <li key={h}>· {h}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>
      </div>
    </>
  );
}

function FlightGroup({
  title,
  flights,
  tone,
  className,
}: {
  title: string;
  flights: Flight[];
  tone: "outbound" | "return";
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="reveal flex flex-wrap items-center gap-2">
        <h3 className="ft-display text-lg text-[var(--ft-ink)]">{title}</h3>
        <span className={tone === "outbound" ? "ft-pill ft-pill-sky" : "ft-pill ft-pill-pink"}>
          {tone === "outbound" ? "Ida" : "Vuelta"}
        </span>
      </div>
      <ol className="mt-5 space-y-4">
        {flights.map((flight) => (
          <li key={flight.id} className="reveal">
            <FlightTicket flight={flight} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function FlightTicket({ flight }: { flight: Flight }) {
  const depTime = shortTime(flight.departureLabel);
  const arrTime = shortTime(flight.arrivalLabel);
  const depDay = shortDay(flight.departureLabel);
  const arrDay = shortDay(flight.arrivalLabel);

  return (
    <article className="ft-flight-card pl-4">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="ft-pill ft-pill-lavender !shadow-none">
            {flight.airline}
          </span>
          <span className="rounded-full bg-[var(--ft-ink)] px-2.5 py-1 font-mono text-xs font-bold tracking-wide text-white">
            {flight.flightNumber}
          </span>
        </div>
        <span className="ft-pill ft-pill-mint !shadow-none">
          {flight.fromAirport.code} → {flight.toAirport.code}
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-5">
        <div>
          <p className="ft-display text-3xl leading-none text-[var(--ft-ink)] sm:text-4xl">
            {flight.fromAirport.code}
          </p>
          <p className="mt-1 text-xs text-[var(--ft-muted)]">
            {flight.fromAirport.city}
          </p>
          <p className="mt-2 ft-display text-xl text-[var(--ft-sky-deep)]">{depTime}</p>
          <p className="text-xs text-[var(--ft-faint)]">{depDay}</p>
        </div>

        <div className="flex flex-col items-center px-1">
          <RouteArc />
          <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-wider text-[var(--ft-lavender-deep)]">
            en ruta
          </span>
        </div>

        <div className="text-right">
          <p className="ft-display text-3xl leading-none text-[var(--ft-ink)] sm:text-4xl">
            {flight.toAirport.code}
          </p>
          <p className="mt-1 text-xs text-[var(--ft-muted)]">{flight.toAirport.city}</p>
          <p className="mt-2 ft-display text-xl text-[var(--ft-pink-deep)]">{arrTime}</p>
          <p className="text-xs text-[var(--ft-faint)]">{arrDay}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-[var(--ft-ink)]/15 px-4 py-3">
        <p className="text-xs text-[var(--ft-muted)]">
          {flight.fromAirport.shortName} → {flight.toAirport.shortName}
        </p>
        {flight.note ? (
          <span className="ft-pill ft-pill-yellow !px-2 !py-0.5 !text-[0.65rem] !shadow-none">
            {flight.note}
          </span>
        ) : null}
      </div>
    </article>
  );
}

function RouteArc() {
  return (
    <svg width="88" height="36" viewBox="0 0 88 36" aria-hidden className="overflow-visible">
      <path
        d="M4 28 C28 4, 60 4, 84 28"
        fill="none"
        stroke="#9B7CF0"
        strokeWidth="2.5"
        strokeDasharray="5 5"
        strokeLinecap="round"
      />
      <circle cx="4" cy="28" r="4" fill="#6EC8FF" stroke="#1F2A44" strokeWidth="1.5" />
      <circle cx="84" cy="28" r="4" fill="#FFB3D0" stroke="#1F2A44" strokeWidth="1.5" />
      <g transform="translate(38 6)">
        <path
          d="M0 10 L18 4 L14 10 L20 13 L12 14 L10 20 L7 14 L0 15 Z"
          fill="#FFE566"
          stroke="#1F2A44"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/** Pull "HH:MM" (or localized time) from a longer es-MX label. */
function shortTime(label: string) {
  const match = label.match(/(\d{1,2}:\d{2})/);
  return match?.[1] ?? label;
}

function shortDay(label: string) {
  const withoutTime = label.replace(/\d{1,2}:\d{2}.*/, "").trim();
  return withoutTime.replace(/,\s*$/, "") || label;
}
