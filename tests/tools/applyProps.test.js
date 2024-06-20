import { describe, it, expect } from 'vitest';
import { signal } from '@preact/signals-core';
import { applyProps } from '../../src/tools/applyProps.js';

/**
 * @returns {Promise<void>}
 */
function nextTick() {
  return new Promise((resolve) => setTimeout(resolve(), 0));
}

describe('applyProps', () => {
  it('applies JS properties and HTML attributes to an element', async () => {
    const tabIndex = signal(0);
    const baz = signal('abc');
    const { ref } = applyProps({
      hidden: () => true,
      tabIndex: () => tabIndex.value,
      attrs: {
        'data-foo': () => 'bar',
        'data-baz': () => baz.value,
      },
    });

    const div = document.createElement('div');

    ref(div);

    await nextTick();

    expect(div.hidden).toBe(true);
    expect(div.tabIndex).toBe(0);
    expect(div.getAttribute('data-foo')).toBe('bar');
    expect(div.getAttribute('data-baz')).toBe('abc');

    tabIndex.value = 1;
    baz.value = 'def';

    await nextTick();

    expect(div.hidden).toBe(true);
    expect(div.tabIndex).toBe(1);
    expect(div.getAttribute('data-foo')).toBe('bar');
    expect(div.getAttribute('data-baz')).toBe('def');
  });
});
