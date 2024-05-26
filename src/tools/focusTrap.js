import { effect } from '@preact/signals-core';
import { readonly } from '../readonly.js';
import { createRef } from '../ref.js';
import { toggleValue } from './toggleValue.js';

/** @param {boolean} [trapped] */
export function focusTrap(trapped) {
  /** @param {Element} element */
  function trapFocus(element) {
    /** @type {NodeListOf<HTMLElement>} */
    const focusableEls = element.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])',
    );
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    const KEYCODE_TAB = 9;

    /**
     * @param {KeyboardEvent} e
     */
    const listener = (e) => {
      const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        /* shift + tab */ if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } /* tab */ else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    };

    // @ts-ignore
    element.addEventListener('keydown', listener);

    return listener;
  }

  /**
   * @param {EventTarget} element
   * @param {(event: KeyboardEvent) => void} listener
   */
  function untrapFocus(element, listener) {
    // @ts-ignore
    element.removeEventListener('keydown', listener);
  }

  const { on: trappedSignal, toggle } = toggleValue(Boolean(trapped));
  /** @type {import('../global.d.ts').Ref<Element>} */
  const targetRef = createRef();

  effect(() => {
    if (!trappedSignal.value) {
      return;
    }

    const element = targetRef.current;

    if (element) {
      const listener = trapFocus(element);

      return () => untrapFocus(element, listener);
    }
  });

  return {
    trapped: readonly(trappedSignal),
    ref: targetRef,
    toggle,
  };
}
