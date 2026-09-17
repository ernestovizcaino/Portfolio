import { Section } from "@/components/Section";
import type { getPublicItinerary } from "@/lib/family-trip/status";

type Itinerary = ReturnType<typeof getPublicItinerary>;
type Flight = Itinerary["flights"][number];

export function TripFlights({
  flights,
  now,
}: {
  flights: Flight[];
  now: Date;
}) {
  const outbound = flights.filter((f) => f.direction === "outbound");
  const inbound = flights.filter((f) => f.direction === "return");

  return (
    <Section
      id="vuelos"
      label="Vuelos"
      intro="Seis vuelos en total: tres de ida y tres de regreso. Cada horario es la hora del lugar donde está el aeropuerto, no la de aquí."
    >
      <FlightGroup
        title="Ida"
        subtitle="Sábado 19 · San Luis Potosí → Córdoba"
        tone="outbound"
        flights={outbound}
        now={now}
        className="mt-8"
      />
      <FlightGroup
        title="Regreso"
        subtitle="Domingo 27 · Córdoba → San Luis Potosí"
        tone="return"
        flights={inbound}
        now={now}
        className="mt-12"
      />
    </Section>
  );
}

function FlightGroup({
  title,
  subtitle,
  flights,
  tone,
  now,
  className,
}: {
  title: string;
  subtitle: string;
  flights: Flight[];
  tone: "outbound" | "return";
  now: Date;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="reveal flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="ft-display text-xl text-[var(--ft-ink)]">{title}</h3>
        <p className="text-sm text-[var(--ft-muted)]">{subtitle}</p>
      </div>

      <ol className="mt-5">
        {flights.map((flight, i) => {
          const next = flights[i + 1];
          const layover = next
            ? new Date(next.departureAt).getTime() -
              new Date(flight.arrivalAt).getTime()
            : null;

          return (
            <li key={flight.id} className="reveal">
              <FlightTicket flight={flight} index={i} total={flights.length} tone={tone} now={now} />
              {layover != null && layover > 0 ? (
                <p className="ft-layover">
                  Espera {formatDuration(layover / 60_000)} en{" "}
                  {flight.toAirport.city}
                </p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function FlightTicket({
  flight,
  index,
  total,
  tone,
  now,
}: {
  flight: Flight;
  index: number;
  total: number;
  tone: "outbound" | "return";
  now: Date;
}) {
  const departure = new Date(flight.departureAt);
  const arrival = new Date(flight.arrivalAt);
  const durationMin = (arrival.getTime() - departure.getTime()) / 60_000;

  const done = now > arrival;
  const inProgress = now >= departure && now <= arrival;

  return (
    <article
      className={[
        "ft-boarding",
        tone === "return" ? "is-return" : "",
        done ? "is-done" : "",
        inProgress ? "is-now" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4 pl-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="ft-chip">
            Vuelo {index + 1} de {total}
          </span>
          <span className="ft-chip is-ink font-mono">{flight.flightNumber}</span>
        </div>
        {inProgress ? (
          <span className="ft-chip is-leaf">
            <span className="ft-dot is-pulsing" aria-hidden />
            Volando ahorita
          </span>
        ) : done ? (
          <span className="ft-chip">Ya voló</span>
        ) : (
          <span className="text-xs font-semibold text-[var(--ft-faint)]">
            {flight.airline}
          </span>
        )}
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-5 pl-5">
        <div>
          <p className="ft-display text-[2rem] leading-none text-[var(--ft-ink)]">
            {flight.fromAirport.code}
          </p>
          <p className="ft-display ft-stat-value mt-1.5 text-lg text-[var(--ft-ink)]">
            {flight.departureTimeLabel}
          </p>
          <p className="mt-0.5 text-xs leading-tight text-[var(--ft-muted)]">
            {flight.fromAirport.city}
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 px-1">
          <span className="text-[0.7rem] font-bold text-[var(--ft-faint)]">
            {formatDuration(durationMin)}
          </span>
          <RouteArc />
        </div>

        <div className="text-right">
          <p className="ft-display text-[2rem] leading-none text-[var(--ft-ink)]">
            {flight.toAirport.code}
          </p>
          <p className="ft-display ft-stat-value mt-1.5 text-lg text-[var(--ft-ink)]">
            {flight.arrivalTimeLabel}
            {crossesMidnight(flight) ? (
              <span className="ml-1 align-super text-xs text-[var(--ft-coral-ink)]">
                +1
              </span>
            ) : null}
          </p>
          <p className="mt-0.5 text-xs leading-tight text-[var(--ft-muted)]">
            {flight.toAirport.city}
          </p>
        </div>
      </div>

      {flight.note ? (
        <div className="ft-perforation px-4 py-3 pl-5">
          <p className="text-xs leading-relaxed text-[var(--ft-muted)]">
            {flight.note}
          </p>
        </div>
      ) : null}
    </article>
  );
}

function RouteArc() {
  return (
    <svg
      width="74"
      height="26"
      viewBox="0 0 74 26"
      aria-hidden
      className="overflow-visible"
    >
      <path
        d="M4 20 C22 2, 52 2, 70 20"
        fill="none"
        stroke="currentColor"
        className="text-[var(--ft-line)]"
        strokeWidth="2"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
      <circle cx="4" cy="20" r="3" className="fill-[var(--ft-sky-deep)]" />
      <circle cx="70" cy="20" r="3" className="fill-[var(--ft-coral-deep)]" />
      <g transform="translate(31 -1)">
        <path
          d="M0 8 L14 3 L11 8 L16 10 L10 11 L8 16 L6 11 L0 12 Z"
          className="fill-[var(--ft-grape-deep)]"
        />
      </g>
    </svg>
  );
}

function crossesMidnight(flight: Flight): boolean {
  return flight.departureLocal.slice(0, 10) !== flight.arrivalLocal.slice(0, 10);
}

function formatDuration(minutes: number): string {
  const total = Math.max(1, Math.round(minutes));
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  if (hours === 0) return `${rest} min`;
  return rest > 0 ? `${hours} h ${rest} min` : `${hours} h`;
}
