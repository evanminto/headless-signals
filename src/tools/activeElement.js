import { effect, signal } from "@preact/signals-core";
import { readonly } from "../readonly.js";
import { eventListener } from "./eventListener.js";

/**
 * @template T
 * @typedef {import('@preact/signals').Signal<T>} Signal<T>
 */

export function activeElement() {
  /** @type {Signal<Element | null>} */
  const element = signal(null);
  const { targetRef: inTargetRef, event: inEvent, end: endIn } = eventListener('focusin');
  const { targetRef: outTargetRef, event: outEvent, end: endOut } = eventListener('focusout');
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
    }
  };
}
