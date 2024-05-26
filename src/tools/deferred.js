import { signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';

/**
 * @template T
 * @param {Promise<T>} promise
 */
export function deferred(promise) {
  /** @type {import('../global.d.ts').Signal<T | null>} */
  const value = signal(null);
  const isPending = signal(true);
  /** @type {import('../global.d.ts').Signal<Error | null>} */
  const error = signal(null);

  promise
    .then((v) => {
      value.value = v;
      isPending.value = false;
    })
    .catch((e) => (error.value = e));

  return {
    value: readonly(value),
    isPending: readonly(isPending),
    error: readonly(error),
  };
}
