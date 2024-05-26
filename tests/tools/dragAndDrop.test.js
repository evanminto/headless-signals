import { vitest, describe, it, expect } from 'vitest';
import { draggable, droppable } from '../../src/tools/dragAndDrop.js';

class MockDragLeaveEvent extends Event {
  constructor() {
    super('dragleave');
  }

  clientX = 200;
  clientY = 200;
}

describe('draggable', () => {
  it('keeps track of whether the element is being dragged', async () => {
    const { ref, dragging } = draggable({
      getData(event) {
        return ['text', 'foobar'];
      },
    });

    const draggableEl = document.createElement('div');
    document.body.appendChild(draggableEl);
    ref(draggableEl);

    expect(draggableEl.draggable).toBe(true);
    draggableEl.dispatchEvent(new CustomEvent('dragstart'));
    expect(dragging.value).toBe(true);
    draggableEl.dispatchEvent(new CustomEvent('dragend'));
    expect(dragging.value).toBe(false);
  });
});

describe('droppable', () => {
  it('keeps track of whether the element is being dropped', async () => {
    const onDrop = vitest.fn();
    const { ref, dropping } = droppable({ onDrop });

    const droppableEl = document.createElement('div');
    droppableEl.style.width = '100px';
    droppableEl.style.height = '100px';
    document.body.appendChild(droppableEl);
    ref(droppableEl);

    droppableEl.dispatchEvent(new CustomEvent('dragenter'));
    expect(dropping.value).toBe(true);

    droppableEl.dispatchEvent(new MockDragLeaveEvent());
    expect(dropping.value).toBe(false);

    droppableEl.dispatchEvent(new CustomEvent('drop'));
    expect(onDrop).toHaveBeenCalledOnce();
  });
});
