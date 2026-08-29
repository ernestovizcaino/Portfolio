// A tiny external store for "the current second", so components can read the
// clock through useSyncExternalStore instead of setState-in-an-effect.
// The snapshot is cached and only mutated inside the interval callback, which
// is what useSyncExternalStore requires.

let snapshot: number | null = null;
let interval: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();

function tick() {
  snapshot = Date.now();
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void) {
  listeners.add(listener);

  if (!interval) {
    tick();
    interval = setInterval(tick, 1000);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && interval) {
      clearInterval(interval);
      interval = null;
      snapshot = null;
    }
  };
}

export function getSnapshot() {
  return snapshot;
}

/** The server has no clock to show. Render a placeholder and fill it in after
 *  hydration, which also avoids a timezone mismatch between server and client. */
export function getServerSnapshot() {
  return null;
}
