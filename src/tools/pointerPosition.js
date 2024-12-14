import { signal } from '@preact/signals-core';
import { eventListener } from './eventListener.js';

export function pointerPosition() {
  const x = signal(0);
  const y = signal(0);

  const { ref, end } = eventListener('pointermove', (event) => {
    x.value = event.clientX;
    y.value = event.clientY;
  });

  ref(document.body);

  return {
    x,
    y,
    dispose: end,
  };
}
