import { describe, it, expect } from 'vitest';
import { liveSelectors } from '../../src/tools.js';

/**
 * @returns {Promise<void>}
 */
function nextTick() {
  return new Promise((resolve) => setTimeout(resolve(), 0));
}

describe('liveSelectors', () => {
  it('detects changes', async () => {
    const container = document.createElement('div');
    const a = document.createElement('a');
    const b = document.createElement('b');
    container.appendChild(a);

    const { ref, results } = liveSelectors({
      a: 'a',
      b: 'b',
    });

    ref(container);

    await nextTick();

    expect(results.value.a).toBe(a);
    expect(results.value.b).toBe(null);

    container.appendChild(b);

    await nextTick();

    expect(results.value.b).toBe(b);
  });
});
