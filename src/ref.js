import { effect, signal } from '@preact/signals-core';

/**
 * @template T
 * @param {T | undefined} [initialValue]
 * @returns {import('./global.d.ts').Ref<T>}
 */
export function createRef(initialValue) {
  const refSignal = signal(initialValue);

  /**
   * @param {T | undefined} value
   * @returns {void}
   */
  const refFn = (value) => {
    refSignal.value = value;
  };

  Object.defineProperty(refFn, 'current', {
    get() {
      return refSignal.value;
    },
    enumerable: false,
    configurable: false,
  });

  return refFn;
}

/** @deprecated */
export const ref = createRef;

/**
 * @template T
 * @param {import('./global.d.ts').Ref<T>[]} refs
 */
export function forwardedRef(refs) {
  /** @type {import('./global.d.ts').Ref<T>} */
  const newRef = createRef();

  effect(() => {
    refs.forEach((ref) => ref(newRef.current));
  });

  return newRef;
}
