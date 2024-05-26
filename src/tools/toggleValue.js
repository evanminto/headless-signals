import { signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';

export function toggleValue(initialOn = false) {
  const on = signal(initialOn);

  return {
    on: readonly(on),
    toggle() {
      on.value = !on.value;
    },
  };
}
