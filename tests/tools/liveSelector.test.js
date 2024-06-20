import { describe, it, expect } from 'vitest';
import { liveSelector } from '../../src/tools.js';

/**
 * @returns {Promise<void>}
 */
function nextTick() {
  return new Promise((resolve) => setTimeout(resolve(), 0));
}

describe('liveSelector', () => {
  it('detects changes', async () => {
    const container = document.createElement('div');
    const a = document.createElement('a');
    const b = document.createElement('b');
    container.appendChild(a);

    const { ref: aRef, element: aElement } = liveSelector('a');
    const { ref: bRef, element: bElement } = liveSelector('b');

    aRef(container);
    bRef(container);

    await nextTick();

    expect(aElement.value).toBe(a);
    expect(bElement.value).toBe(null);

    container.appendChild(b);

    await nextTick();

    expect(bElement.value).toBe(b);
  });
});
