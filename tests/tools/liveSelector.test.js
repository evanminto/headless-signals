import { describe, it, expect } from 'vitest';
import { liveSelector } from '../../src/tools.js';

/**
 * @param {Parameters<setTimeout>[0]} callback
 * @param {Parameters<setTimeout>[1]} [ms]
 * @returns {Promise<void>}
 */
function resolveTimeout(callback, ms) {
  return new Promise((resolve) =>
    setTimeout(() => {
      callback();
      resolve();
    }, 0),
  );
}

describe('liveSelector', () => {
  it('detects changes', async () => {
    const { ref, element } = liveSelector('a');

    expect(element.value).toBe(null);

    const container = document.createElement('div');
    const a = document.createElement('a');

    ref(container);
    container.appendChild(a);
    await resolveTimeout(() => expect(element.value).toBe(a));
  });
});
