import { effect, signal } from "@preact/signals-core";
import { eventListener } from "../tools/eventListener.js";
import { readonly } from "../readonly.js";

export function modalControl({ lightDismiss = false, action = 'toggle' } = {}) {
  const isOpen = signal(false);
  const { ref: controlRef, end: disposeControl } = eventListener('click', () => {
    if (action === 'toggle') {
      isOpen.value = !isOpen.value;
    }
  });

  const { ref: modalEventRef, end: disposeModal } = eventListener('close', () => {
    isOpen.value = false;
  });

  /** @type {Ref<HTMLDialogElement>} */
  // @ts-ignore
  const modalRef = modalEventRef;

  effect(() => {
    const modal = modalRef.current;

    if (modal) {
      if (isOpen.value) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  });
  
  return {
    /** @type {Ref<HTMLDialogElement>} */
    modalRef,
    /** @type {Ref<HTMLButtonElement>} */
    // @ts-ignore
    controlRef,
    isOpen: readonly(isOpen),
    dispose: () => {
      disposeControl();
      disposeModal();
    },
  };
}
