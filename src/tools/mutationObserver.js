import { computed, effect, signal } from "@preact/signals-core";
import { readonly } from "../readonly.js";
import { ref } from "../ref.js";

/**
 * @template T
 * @typedef {import('@preact/signals').Signal<T>} Signal<T>
 */

/**
 * @param {object} [params]
 * @param {MutationObserverInit} [params.options]
 * @param {MutationCallback} [params.onMutation]
 */
export function mutationObserver({ options, onMutation } = {}) {
  /** @type {Ref<Node>} */
  const targetRef = ref();
  /** @type {Signal<MutationRecord[]>} */
  const recordsSignal = signal([]);

  const observer = new MutationObserver((records, obs) => {
    recordsSignal.value = records;
    onMutation?.(records, obs);
  });
  
  const endEffect = effect(() => {
    if (targetRef.current) {
      observer.observe(targetRef.current, options);
    }

    return () => observer.disconnect();
  });

  return {
    ref: targetRef,
    records: readonly(recordsSignal),
    observer: computed(() => observer),
    end: endEffect,
  };
}
