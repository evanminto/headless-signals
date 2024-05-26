import { computed, effect, signal } from '@preact/signals-core';
import { eventListener } from '../tools/eventListener.js';
import { readonly } from '../readonly.js';

export function modalControl({ lightDismiss = false, action = 'toggle' } = {}) {
  const isOpen = signal(false);
  const { ref: controlRef, end: disposeControl } = eventListener(
    'click',
    () => {
      if (action === 'toggle') {
        isOpen.value = !isOpen.value;
      }
    },
  );

  const { ref: modalRef, end: disposeModal } = eventListener('close', () => {
    isOpen.value = false;
  });

  const modalEl = computed(() =>
    modalRef.current instanceof HTMLDialogElement ? modalRef.current : null,
  );

  effect(() => {
    if (modalEl.value) {
      if (isOpen.value) {
        modalEl.value.showModal();
      } else {
        modalEl.value.close();
      }
    }
  });

  return {
    /** @type {import('../global.js').Ref<HTMLDialogElement>} */
    // @ts-ignore
    modalRef,
    /** @type {import('../global.js').Ref<HTMLButtonElement>} */
    // @ts-ignore
    controlRef,
    isOpen: readonly(isOpen),
    dispose: () => {
      disposeControl();
      disposeModal();
    },
  };
}
