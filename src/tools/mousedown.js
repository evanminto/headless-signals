import { signal } from '@preact/signals-core';
import { eventListener } from './eventListener.js';
import { readonly } from '../readonly.js';
import { forwardedRef } from '../ref.js';

export function mousedown() {
  const down = signal(false);

  const { ref: mousedownRef, end: endMousedown } = eventListener(
    'mousedown',
    () => (down.value = true),
  );

  const { ref: mouseupRef, end: endMouseup } = eventListener(
    'mouseup',
    () => (down.value = false),
  );

  const end = () => {
    endMousedown();
    endMouseup();
  };

  return {
    ref: forwardedRef([mousedownRef, mouseupRef]),
    down: readonly(down),
    end,
    dispose: end,
  };
}
