import { computed, effect, signal } from '@preact/signals-core';

/**
 * @template T
 * @param {(oldValue: T | undefined) => T} fn
 */
export function computedFromLast(fn) {
  /** @type {T | undefined} */
  let oldValue = undefined;

  /** @type {ReturnType<typeof computed<T>>} */
  return computed(() => {
    const newValue = fn(oldValue);
    oldValue = newValue;

    return newValue;
  });
}
