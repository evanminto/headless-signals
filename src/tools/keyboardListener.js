import { computed, effect, signal } from "@preact/signals-core";
import { ref } from "../ref.js";
import { eventListener } from "./eventListener.js";
import { activeElement } from "./activeElement.js";

/**
 * @template T
 * @typedef {import('@preact/signals').Signal<T>} Signal<T>
 */

export function keyboardListener() {
  /** @type {Ref<Node>} */
  const targetRef = ref();
  const { targetRef: kbTargetRef, event, end: endListener } = eventListener('keyup');
  const { element: activeEl, end: endActive } = activeElement();
  const isListeningToAll = computed(() => !targetRef.current);
  const isFocusedOnTarget = computed(() => (
    targetRef.current?.contains(activeEl.value) ||
    targetRef.current === activeEl.value
  ));
  const isListening = computed(() => isListeningToAll.value || isFocusedOnTarget.value);

  const end = effect(() => kbTargetRef(isListening.value ? window : undefined));
  
  return {
    ref: targetRef,
    event,
    end: () => {
      endListener();
      endActive();
      end();
    },
  };
}