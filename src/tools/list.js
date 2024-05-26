import { signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';

const EMPTY_ARRAY = [];

/**
 * @template T
 * @param {T[]} initialValue
 */
export function list(initialValue = EMPTY_ARRAY) {
  const items = signal(initialValue);

  return {
    items: readonly(items),
    /** @param {T} item */
    push(item) {
      items.value = [...items.value, item];
    },
    pop() {
      const newItems = [...items.value];
      newItems.pop();
      items.value = newItems;
    },
    clear() {
      items.value = EMPTY_ARRAY;
    },
    reset() {
      items.value = initialValue;
    },
  };
}
