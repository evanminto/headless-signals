import { computed, effect, signal } from "@preact/signals-core";
import { readonly } from "../readonly.js";
import { ref } from "../ref.js";

/**
 * @param {object} [params]
 * @param {MutationObserverInit} [params.options]
 * @param {MutationCallback} [params.onMutation]
 */
export function mutationObserver({ options, onMutation } = {}) {
  /** @type {import('../global.d.ts').Ref<Node>} */
  const targetRef = ref();
  /** @type {import('../global.d.ts').Signal<MutationRecord[]>} */
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
