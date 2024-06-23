import { cache } from './cache.js';

/**
 * @template T
 * @param {() => T[]} getArray
 * @param {(value: T) => string} [getElementKey]
 * @param {string} [separator]
 */
export function cacheArray(
  getArray,
  getElementKey = (element) => `${element}`,
  separator = ',',
) {
  return cache(getArray, (arr) => arr.map(getElementKey).join(separator));
}
