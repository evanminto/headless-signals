import { computed, effect, signal } from '@preact/signals-core';
import { createRef } from '../ref.js';
import { readonly } from '../readonly.js';

/**
 * @param {object} [params]
 * @param {ResizeObserverCallback} [params.onResize]
 * @param {Element} [params.target]
 * @returns
 */
export function resizeObserver({ onResize, target = null } = {}) {
  const targetRef = createRef(target);
  /** @type {ReturnType<typeof signal<ResizeObserverEntry[]>>} */
  const entries = signal([]);
  const entry = computed(
    () =>
      entries.value.find(({ target }) => target === targetRef.current) || null,
  );

  const observer =
    typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver((roEntries, obs) => {
          entries.value = roEntries;
          onResize?.(roEntries, obs);
        });

  const dispose = effect(() => {
    const el = targetRef.current;

    if (el && observer) {
      observer.observe(el);

      return () => observer.unobserve(el);
    }
  });

  return {
    ref: targetRef,
    entry: readonly(entry),
    dispose,
  };
}
