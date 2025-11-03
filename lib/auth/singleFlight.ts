// singleFlight.js
const inFlight = new Map();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function singleFlight(key: string, fn: () => Promise<any>) {
  if (inFlight.has(key)) {
    // If another call already started, return the same promise
    return inFlight.get(key);
  }

  const promise = (async () => {
    try {
      return await fn();
    } finally {
      inFlight.delete(key);
    }
  })();

  inFlight.set(key, promise);
  return promise;
}
