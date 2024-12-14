import { signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';

/**
 * Manages async optimistic updates for a signal value. When the async update is
 * in progress, the value will have an "optimistic" value applied so that
 * consumers can act as if the update has already completed.
 * @template T
 * @param {T} initialValue
 */
export function optimistic(initialValue) {
  const value = signal(initialValue);
  const isInitialValue = signal(true);
  const isUpdating = signal(false);

  /**
   * @param {() => T | Promise<T>} fn
   * @param {T} optimisticValue
   */
  async function updateOptimistic(fn, optimisticValue) {
    const originalValue = value.value;
    value.value = optimisticValue;

    try {
      isUpdating.value = true;
      value.value = await fn();
    } catch (error) {
      // Update failed, restore old value
      value.value = originalValue;
      isInitialValue.value = false;
      throw error;
    } finally {
      isUpdating.value = false;
    }
  }

  /** @param {T} newValue */
  function setValue(newValue) {
    value.value = newValue;
    isInitialValue.value = false;
  }

  return {
    value: readonly(value),
    isUpdating,
    isInitialValue: readonly(isInitialValue),
    setValue,
    /**
     * Runs a function, and while awaiting its Promise return value, sets the
     * value signal to the optimistic value
     */
    updateOptimistic,
  };
}
