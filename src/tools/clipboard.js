import { signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';

export function clipboard() {
  const copied = signal(false);
  const copy = async (text) => {
    if (
      typeof window === 'undefined' ||
      !('navigator' in window) ||
      !('clipboard' in navigator)
    ) {
      return false;
    }

    await navigator.clipboard.writeText(text);

    return (copied.value = true);
  };

  return {
    copied: readonly(copied),
    copy,
  };
}
