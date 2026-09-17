import { Section } from "@/components/Section";
import type { getPublicItinerary } from "@/lib/family-trip/status";

type Itinerary = ReturnType<typeof getPublicItinerary>;

export function TripItinerary({ data }: { data: Itinerary }) {
  const outbound = data.flights.filter((f) => f.direction === "outbound");
  const inbound = data.flights.filter((f) => f.direction === "return");

  return (
    <>
      <Section
        id="vuelos"
        label="Vuelos"
        intro="Ida y vuelta con números, horarios locales y aeropuertos. Sin GPS personal — solo el itinerario."
      >
        <FlightGroup title="Ida · SLP → Córdoba" flights={outbound} />
        <FlightGroup title="Regreso · Córdoba → SLP" flights={inbound} className="mt-10" />
      </Section>

      <div className="mt-20">
        <Section
          id="lugares"
          label="En Córdoba"
          intro="Hotel, conferencia y la cena pendiente de confirmar."
        >
          <ul className="mt-8 space-y-8">
            {data.places.map((place) => (
              <li key={place.id} className="reveal">
                <p className="meta">{place.role}</p>
                <a
                  href={place.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block text-base font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {place.name}
                </a>
                <p className="mt-1 text-sm text-muted-foreground">{place.address}</p>
                {place.notes?.length ? (
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {place.notes.map((note) => (
                      <li key={note}>· {note}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="reveal mt-10 rounded-2xl bg-surface px-4 py-4">
            <p className="meta">Traslado llegada</p>
            <p className="mt-2 text-sm text-foreground">
              {data.transfer.label} · recogida ~06:50 ·{" "}
              {data.transfer.destination}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
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
          intro="Del 19 al 27 de septiembre de 2026."
        >
          <ol className="mt-8 space-y-8">
            {data.days.map((day) => (
              <li key={day.date} className="reveal">
                <p className="meta">
                  {day.weekday} · {day.date.slice(8)} sep
                </p>
                <h3 className="mt-1 text-base font-medium text-foreground">
                  {day.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {day.summary}
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
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
  className,
}: {
  title: string;
  flights: Itinerary["flights"];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="reveal text-base font-medium text-foreground">{title}</h3>
      <ol className="mt-5 space-y-6">
        {flights.map((flight) => (
          <li key={flight.id} className="reveal">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-medium text-foreground">
                {flight.airline}{" "}
                <span className="font-mono tracking-wide">{flight.flightNumber}</span>
              </p>
              <p className="meta">
                {flight.fromAirport.code} → {flight.toAirport.code}
              </p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Sale {flight.departureLabel} · llega {flight.arrivalLabel}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {flight.fromAirport.shortName} → {flight.toAirport.shortName}
            </p>
            {flight.note ? (
              <p className="mt-1 text-sm text-faint">{flight.note}</p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
