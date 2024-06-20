import { computed, effect, signal } from '@preact/signals-core';
import { mutationObserver } from './mutationObserver.js';

/**
 * @template {string} T
 * @param {Record<T, string>} selectors
 */
export function liveSelectors(selectors) {
  const { ref, records } = mutationObserver({
    options: { childList: true, subtree: true },
  });
  /** @type {import('../ref.js').Ref<Element>} */
  const typedRef = ref;
  /** @type {ReturnType<typeof signal<Record<T, Element | null>>>} */
  const results = signal(() => {});
  /** @type {[T, string][]} */
  const selectorEntries = Array.from(Object.entries(selectors));

  const getResults = () => {
    return selectorEntries
      .map(
        /** @returns {[T, Element | null]} */
        ([key, selector]) => [
          key,
          typedRef.current?.querySelector(selector) || null,
        ],
      )
      .reduce(
        (resultsMap, [key, element]) => ({
          ...resultsMap,
          [key]: element,
        }),
        /** @type {Record<T, Element | null>} */ ({}),
      );
  };

  const disposeSub = records.subscribe(() => {
    results.value = getResults();
  });

  const disposeEffect = effect(() => {
    results.value = getResults();
  });

  return {
    ref: typedRef,
    results,
    dispose: () => {
      disposeSub();
      disposeEffect();
    },
  };
}
