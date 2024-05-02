import { computed, effect, signal } from "@preact/signals-core";
import { readonly } from "../readonly.js";
import { forwardedRef } from "../ref.js";
import { eventListener } from "./eventListener.js";
import { mousedown } from "./mousedown.js";

/**
 * @param {object} [params]
 * @param {(event: Event) => [string, string]} [params.getData] Returns a tuple of type and data
 */
export function draggable({ getData } = {}) {
  const dragging = signal(false);

  /** @type {ReturnType<typeof eventListener<'dragstart', HTMLElement>>} */
  const { ref: dragstartRef, end: endDragstart } = eventListener('dragstart', (event) => {
    dragging.value = true;

    if (getData) {
      event.dataTransfer?.setData(...getData(event));
    }
  });

  /** @type {ReturnType<typeof eventListener<'dragend', HTMLElement>>} */
  const { ref: dragendRef, end: endDragend } = eventListener('dragend', () => {
    dragging.value = false;
  });

  const { ref: handleRef, down: mouseIsDownOnHandle, end: endMousedown } = mousedown();

  const targetRef = forwardedRef([dragstartRef, dragendRef]);
  const isDraggable = computed(() => !handleRef.current || mouseIsDownOnHandle.value);

  const end = effect(() => {
    const target = targetRef.current;

    if (target) {
      target.draggable = isDraggable.value;
    }
  });
  
  return {
    ref: targetRef,
    handleRef,
    dragging: readonly(dragging),
    end: () =>{
      end();
      endDragstart();
      endDragend();
      endMousedown();
    },
  };

}

/**
 * @param {object} [params]
 * @param {(event: DragEvent) => void} [params.onDrop]
 */
export function droppable({ onDrop } = {}) {
  const dropping = signal(false);

  /** @type {ReturnType<typeof eventListener<'dragenter', HTMLElement>>} */
  const { ref: dragenterRef, end: endDragenter } = eventListener('dragenter', (event) => {
    event.preventDefault();
    dropping.value = true;
  });

  /** @type {ReturnType<typeof eventListener<'dragover', HTMLElement>>} */
  const { ref: dragoverRef, end: endDragover } = eventListener(
    'dragover',
    (event) => event.preventDefault()
  );

  /** @type {ReturnType<typeof eventListener<'dragleave', HTMLElement>>} */
  const { ref: dragleaveRef, end: endDragleave } = eventListener(
    'dragleave',
    (event) => {
      event.preventDefault();
      const { clientX, clientY } = event;
      const rect = dragleaveRef.current?.getBoundingClientRect();

      if (
        rect && (
          clientY <= rect.top ||
          clientY >= rect.bottom ||
          clientX <= rect.left ||
          clientX >= rect.right
        )
      ) {
        dropping.value = false;
      }
    }
  );

  /** @type {ReturnType<typeof eventListener<'drop', HTMLElement>>} */
  const { ref: dropRef, end: endDrop } = eventListener('drop', (event) => {
    dropping.value = false;
    onDrop?.(event);
  });

  const targetRef = forwardedRef([dragenterRef, dragoverRef, dragleaveRef, dropRef]);

  return {
    ref: targetRef,
    dropping: readonly(dropping),
    end: () => {
      endDragenter();
      endDragover();
      endDragleave();
      endDrop();
    },
  };
}