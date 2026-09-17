"use client";

import { useEffect, useState } from "react";

/**
 * A clock that ticks on an interval.
 *
 * Returns `null` until after mount so the server and the first client render
 * agree, and only updates from timer callbacks — never synchronously inside
 * the effect body. Callers fall back to a server-provided instant for the
 * initial paint.
 */
export function useNow(intervalMs: number): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const first = window.setTimeout(() => setNow(new Date()), 0);
    const id = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [intervalMs]);

  return now;
}
