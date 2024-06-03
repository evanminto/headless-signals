import { effect, signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';

/**
 * @template T
 * @param {() => T} getValue
 * @param {(value: T) => string} getKey
 */
export default function cache(getValue, getKey) {
  /** @type {import('../global.js').Signal<T | null>} */
  const value = signal(null);
  /** @type {import('../global.js').Signal<string | null>} */
  const key = signal(null);

  effect(() => {
    const newVal = getValue();
    const newKey = getKey(newVal);

    if (newKey !== key.value) {
      value.value = newVal;
      key.value = newKey;
    }
  });

  return {
    value: readonly(value),
  };
}
