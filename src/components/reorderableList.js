import { effect, signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';
import { forwardedRef } from '../ref.js';
import { draggable, droppable } from '../tools/dragAndDrop.js';

/**
 * @template T
 * @param {T[]} items
 */
export function reorderableList(items = []) {
  const itemsSignal = signal(items);
  /**
   * @type {import('../global.d.ts').Signal<{
   *   item: T;
   *   dragging: import('../global.d.ts').ReadonlySignal<boolean>;
   *   dropping: import('../global.d.ts').ReadonlySignal<boolean>;
   *   ref: import('../global.d.ts').Ref<HTMLElement>;
   *   handleRef: import('../global.d.ts').Ref<Element>;
   *   draggableRef: import('../global.d.ts').Ref<HTMLElement>;
   *   droppableRef: import('../global.d.ts').Ref<HTMLElement>;
   *   moveUp: () => void;
   *   moveDown: () => void;
   *   moveToTop: () => void;
   * }[]>}
   */
  const wrappedItemsSignal = signal([]);

  /**
   * @param {number} from 
   * @param {number} to 
   */
  function moveToIndex(from, to) {
    const arr = [...itemsSignal.value];

    if (to < 0 || to > arr.length - 1) {
      return;
    }

    const element = arr.splice(from, 1)[0];
    arr.splice(to, 0, element);
    itemsSignal.value = arr;
  }

  const end = effect(() => {
    const wrappedItems = itemsSignal.value.map((item, index) => {
      const {
        ref: draggableRef,
        handleRef,
        dragging,
        end: endDraggable,
      } = draggable({ getData: () => ['text', index.toString()] });

      const {
        ref: droppableRef,
        dropping,
        end: endDroppable,
      } = droppable({
        onDrop: (event) => {
          const data = event.dataTransfer?.getData('text');

          if (data) {
            moveToIndex(parseInt(data, 10), index);
          }
        },
      });

      return {
        item,
        dragging,
        dropping,
        ref: forwardedRef([draggableRef, droppableRef]),
        handleRef,
        draggableRef,
        droppableRef,
        moveUp: () => moveToIndex(index, index - 1),
        moveDown: () => moveToIndex(index, index + 1),
        moveToTop: () => moveToIndex(index, 0),
        end: () => {
          endDraggable();
          endDroppable();
        },
      };
    }).flat();

    wrappedItemsSignal.value = wrappedItems.map(({ end, ...item }) => item);

    return () => wrappedItems.forEach(({ end }) => end());
  });

  return {
    items: readonly(wrappedItemsSignal),
    end,
  }
}
