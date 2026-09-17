/**
 * Convert a wall-clock local time in a named IANA zone to a UTC Date.
 * `local` format: YYYY-MM-DDTHH:mm:ss (no offset).
 */
export function localToUtc(local: string, timeZone: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/.exec(local);
  if (!match) {
    throw new Error(`Invalid local datetime: ${local}`);
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);

  const desiredAsUtcMs = Date.UTC(year, month - 1, day, hour, minute, second);
  let guess = desiredAsUtcMs;

  for (let i = 0; i < 3; i++) {
    const parts = zonedParts(new Date(guess), timeZone);
    const asLocalMs = Date.UTC(
      parts.year,
      parts.month - 1,
      parts.day,
      parts.hour,
      parts.minute,
      parts.second,
    );
    guess += desiredAsUtcMs - asLocalMs;
  }

  return new Date(guess);
}

function zonedParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const bag: Record<string, string> = {};
  for (const part of formatter.formatToParts(date)) {
    if (part.type !== "literal") bag[part.type] = part.value;
  }

  let hour = Number(bag.hour);
  if (hour === 24) hour = 0;

  return {
    year: Number(bag.year),
    month: Number(bag.month),
    day: Number(bag.day),
    hour,
    minute: Number(bag.minute),
    second: Number(bag.second),
  };
}

export function formatInTimeZone(
  date: Date,
  timeZone: string,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat("es-MX", { ...options, timeZone }).format(date);
}
