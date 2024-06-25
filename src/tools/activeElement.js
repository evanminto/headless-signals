import { computed, effect, signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';
import { eventListener } from './eventListener.js';

export function activeElement() {
  if (
    typeof window === 'undefined' ||
    !window.document.body ||
    !('activeElement' in window.document)
  ) {
    return {
      element: computed(() => null),
      end: () => {},
    };
  }

  /** @type {ReturnType<typeof signal<Element | null>>} */
  const element = signal(null);
  const {
    targetRef: inTargetRef,
    event: inEvent,
    end: endIn,
  } = eventListener('focusin');
  const {
    targetRef: outTargetRef,
    event: outEvent,
    end: endOut,
  } = eventListener('focusout');
  inTargetRef(document.body);
  outTargetRef(document.body);

  const endInEffect = effect(() => {
    if (inEvent.value) {
      element.value = document.activeElement;
    }
  });

  const endOutEffect = effect(() => {
    if (outEvent.value) {
      element.value = document.activeElement;
    }
  });

  return {
    element: readonly(element),
    end: () => {
      endInEffect();
      endOutEffect();
      endIn();
      endOut();
    },
  };
}
