import { signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';

export function clipboard() {
  const copied = signal(false);
  const copy = async (text) => {
    if (!('clipboard' in navigator)) {
      return false;
    }

    return navigator.clipboard
      .writeText(text)
      .then(() => (copied.value = true));
  };

  return {
    copied: readonly(copied),
    copy,
  };
}
