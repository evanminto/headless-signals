import { effect, signal } from '@preact/signals-core';
import { mutationObserver } from './mutationObserver.js';
import { readonly } from '../readonly.js';

export function liveSelector(selector) {
  const { ref, records } = mutationObserver({
    options: { childList: true, subtree: true },
  });
  /** @type {import('../ref.js').Ref<Element>} */
  const typedRef = ref;
  /** @type {ReturnType<typeof signal<Element | null>} */
  const element = signal(null);
  /** @returns {Element | null} */
  const getEl = () => typedRef.current?.querySelector(selector) || null;

  const disposeSub = records.subscribe((value) => {
    element.value = getEl();
  });

  const disposeEffect = effect((value) => {
    element.value = getEl();
  });

  return {
    ref: typedRef,
    element: readonly(element),
    dispose: () => {
      disposeSub();
      disposeEffect();
    },
  };
}
