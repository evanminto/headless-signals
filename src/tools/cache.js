import { batch, effect, signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';

/**
 * @template T
 * @param {() => T} getValue
 * @param {(value: T) => string} getKey
 */
export function cache(getValue, getKey) {
  /** @type {import('../global.js').Signal<T>} */
  const result = signal(null);
  /** @type {import('../global.js').Signal<string | null>} */
  const key = signal(null);

  effect(() => {
    const newVal = getValue();
    const newKey = getKey(newVal);

    if (newKey !== key.value) {
      batch(() => {
        result.value = newVal;
        key.value = newKey;
      });
    }
  });

  return {
    result: readonly(result),
  };
}
