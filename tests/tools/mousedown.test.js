import { describe, it, expect } from 'vitest';
import { mousedown } from '../../src/tools/mousedown.js';

describe('mousedown', () => {
  it('keeps track of whether the mouse is down on an element', () => {
    const { ref, down } = mousedown();

    const target = document.createElement('div');
    ref(target);

    expect(down.value).toBe(false);

    target.dispatchEvent(new CustomEvent('mousedown'));
    expect(down.value).toBe(true);

    target.dispatchEvent(new CustomEvent('mouseup'));
  });
});
