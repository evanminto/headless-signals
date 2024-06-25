import { computed, effect, signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';
import { createRef } from '../ref.js';

/**
 * @param {object} [params]
 * @param {MutationObserverInit} [params.options]
 * @param {Node | null} [params.target]
 * @param {MutationCallback} [params.onMutation]
 */
export function mutationObserver({ options, target = null, onMutation } = {}) {
  const targetRef = createRef(target);
  /** @type {ReturnType<typeof signal<MutationRecord[]>>} */
  const recordsSignal = signal([]);

  const observer =
    typeof MutationObserver === 'undefined'
      ? null
      : new MutationObserver((records, obs) => {
          recordsSignal.value = records;
          onMutation?.(records, obs);
        });

  const endEffect = effect(() => {
    if (targetRef.current && observer) {
      observer.observe(targetRef.current, options);
    }

    return () => observer && observer.disconnect();
  });

  return {
    ref: targetRef,
    records: readonly(recordsSignal),
    observer: computed(() => observer),
    end: endEffect,
    dispose: endEffect,
  };
}
