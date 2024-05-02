import { signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';

/** 
 * @template T
 * @typedef {import('@preact/signals').Signal<T>} Signal
 */

/**
 * @template T
 * @param {Promise<T>} promise
 */
export function deferred(promise) {
  /** @type {Signal<T | undefined>} */
  const value = signal(undefined);
  const isPending = signal(true);
  /** @type {Signal<Error | undefined>} */
  const error = signal(undefined);

  promise
    .then((v) => {
      value.value = v;
      isPending.value = false;
    })
    .catch((e) => error.value = e);

  return {
    value: readonly(value),
    isPending: readonly(isPending),
    error: readonly(error),
  };
}
