import { effect, signal } from '@preact/signals-core';

/**
 * @template T
 * @param {T | undefined} [initialValue]
 * @returns {Ref<T>}
 */
export function ref(initialValue) {
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
};

/**
 * @template T
 * @param {Ref<T>[]} refs
 */
export function forwardedRef(refs) {
  /** @type {Ref<T>} */
  const newRef = ref();

  effect(() => {
    refs.forEach((ref) => ref(newRef.current));
  });

  return newRef;
}
