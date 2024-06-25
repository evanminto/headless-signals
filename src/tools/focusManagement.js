import { computed } from '@preact/signals-core';
import { createRef } from '../ref.js';
import { activeElement } from './activeElement.js';

/**
 * @param {{ target: HTMLOrSVGElement }} options
 */
export function focusManagement({ target = null } = {}) {
  const targetRef = createRef(target);
  const { element, end } = activeElement();

  return {
    ref: targetRef,
    isFocused: computed(
      () =>
        typeof HTMLElement !== 'undefined' &&
        element.value instanceof HTMLElement &&
        targetRef.current === element.value,
    ),
    /** @param {FocusOptions} [options] */
    focus: (options) => {
      targetRef.current?.focus(options);
    },
    dispose: end,
  };
}
