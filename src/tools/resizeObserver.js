import { computed, effect, signal } from "@preact/signals-core";
import { ref } from "../ref.js";
import { readonly } from "../readonly.js";

/**
 * @param {object} [params]
 * @param {ResizeObserverCallback} [params.onResize]
 * @returns 
 */
export function resizeObserver({ onResize } = {}) {
  /** @type {import('../global.d.ts').Ref<Element | null>} */
  const targetRef = ref();
  /** @type {import('../global.d.ts').Signal<ResizeObserverEntry[]>} */
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