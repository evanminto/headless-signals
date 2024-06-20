import { signal } from '@preact/signals-core';
import { mutationObserver } from './mutationObserver.js';
import { readonly } from '../readonly.js';

export function liveSelector(selector) {
  const { ref, records } = mutationObserver({ options: { childList: true } });
  /** @type {import('../ref.js').Ref<Element>} */
  const typedRef = ref;
  /** @type {ReturnType<typeof signal<Element | null>} */
  const element = signal(null);

  records.subscribe(() => {
    element.value = typedRef.current?.querySelector(selector);
  });

  return {
    ref,
    element: readonly(element),
  };
}
