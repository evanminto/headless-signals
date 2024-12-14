import { signal } from '@preact/signals-core';
import { eventListener } from './eventListener.js';
import { readonly } from '../readonly.js';
import { forwardedRef } from '../ref.js';

/**
 * @param {object} [params]
 * @param {boolean} [params.pointerCapture]
 */
export function pointerDown({ pointerCapture = true } = {}) {
  const down = signal(false);

  const { ref: downRef, end: endDown } = eventListener(
    'pointerdown',
    (event) => {
      down.value = true;

      if (pointerCapture && event.target instanceof Element) {
        event.target.setPointerCapture(event.pointerId);
      }
    },
  );

  const { ref: upRef, end: endUp } = eventListener('pointerup', (event) => {
    down.value = false;

    if (pointerCapture && event.target instanceof Element) {
      event.target.releasePointerCapture(event.pointerId);
    }
  });

  const end = () => {
    endDown();
    endUp();
  };

  return {
    ref: forwardedRef([downRef, upRef]),
    down: readonly(down),
    dispose: end,
  };
}
