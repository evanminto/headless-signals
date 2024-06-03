import { computed } from '@preact/signals-core';

/**
 * @template T
 * @param {import('@preact/signals-core').Signal<T>} signal
 * @returns {import('@preact/signals-core').ReadonlySignal<T>}
 */
export function readonly(signal) {
  return computed(() => signal.value);
}
