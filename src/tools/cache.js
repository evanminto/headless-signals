import { computedIfChanged } from '../helpers/computedIfChanged.js';

/**
 * @template T
 * @param {() => T} getValue
 * @param {(value: T) => string} getKey
 */
export function cache(getValue, getKey) {
  const result = computedIfChanged(
    getValue,
    (oldValue, newValue) =>
      oldValue !== undefined &&
      newValue !== undefined &&
      getKey(oldValue) === getKey(newValue),
  );

  return {
    result,
  };
}
