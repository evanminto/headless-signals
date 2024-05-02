import { computed } from "@preact/signals-core";
import { ref } from "../ref.js";
import { activeElement } from "./activeElement.js";

export function focusManagement() {
  /** @type {Ref<HTMLOrSVGElement>} */
  const targetRef = ref();
  const { element, end } = activeElement();

  return {
    ref: targetRef,
    isFocused: computed(
      () => element.value instanceof HTMLElement && targetRef.current === element.value
    ),
    /** @param {FocusOptions} [options] */
    focus: (options) => {
      targetRef.current?.focus(options);
    },
    dispose: end,
  };
}