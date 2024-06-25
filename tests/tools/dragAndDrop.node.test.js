/**
 * @vitest-environment node
 */
import { vitest, describe, it, expect } from 'vitest';
import { draggable, droppable } from '../../src/tools/dragAndDrop.js';

describe('draggable (Node)', () => {
  it('does nothing', async () => {
    const { dragging } = draggable({
      getData() {
        return ['text', 'foobar'];
      },
    });

    expect(dragging.value).toBe(false);
  });
});

describe('droppable (Node)', () => {
  it('does nothing', async () => {
    const onDrop = vitest.fn();
    const { dropping } = droppable({ onDrop });

    expect(dropping.value).toBe(false);
    expect(onDrop).not.toHaveBeenCalled();
  });
});
