import { computed, effect, signal } from '@preact/signals-core';
import { computedFromLast } from './computedFromLast.js';

/**
 * @template T
 * @param {(oldValue: T) => T} fn
 * @param {(oldValue: T | undefined, newValue: T) => boolean} isEquals
 */
export function computedIfChanged(fn, isEquals) {
  return computedFromLast(
    /** @param {T | undefined} oldValue */
    (oldValue) => {
      const newValue = fn(oldValue);

      if (isEquals(oldValue, newValue)) {
        return oldValue;
      }

      oldValue = newValue;

      return newValue;
    },
  );
}
