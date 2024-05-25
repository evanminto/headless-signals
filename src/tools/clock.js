import { signal } from "@preact/signals-core";

/**
 * @param {object} [params]
 * @param {number} [params.interval]
 */
export function clock({ interval = 1000 } = {}) {
  const date = signal(new Date());
  const intervalId = setInterval(() => date.value = new Date(), interval);

  return {
    date,
    end: () => clearInterval(intervalId),
  };
}
