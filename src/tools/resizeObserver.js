import { computed, effect, signal } from "@preact/signals-core";
import { ref } from "../ref.js";
import { readonly } from "../readonly.js";

/**
 * @template T
 * @typedef {import('@preact/signals').Signal<T>} Signal<T>
 */

/**
 * @param {object} [params]
 * @param {ResizeObserverCallback} [params.onResize]
 * @returns 
 */
export function resizeObserver({ onResize } = {}) {
  /** @type {Ref<Element | null>} */
  const targetRef = ref();
  /** @type {Signal<ResizeObserverEntry[]>} */
  const entries = signal([]);
  const entry = computed(
    () => entries.value.find(({ target }) => target === targetRef.current) || null
  );

  const observer = new ResizeObserver((roEntries, obs) => {
    entries.value = roEntries;
    onResize?.(roEntries, obs);
  });

  const dispose = effect(() => {
    const el = targetRef.current;

    if (el) {
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