import { describe, it, expect, vitest } from 'vitest';
import { mutationObserver } from '../../src/tools/mutationObserver.js';

describe('mutationObserver', () => {
  it('reports the records', async () => {
    const onMutation = vitest.fn();

    const { ref, records } = mutationObserver({
      options: { attributes: true },
      onMutation,
    });

    const target = document.createElement('div');
    ref(target);

    expect(records.value).toEqual([]);

    target.setAttribute('hidden', '');

    await new Promise((resolve) =>
      setTimeout(() => {
        expect(records.value).toHaveLength(1);
        expect(onMutation).toHaveBeenCalled();
        resolve(true);
      }, 0),
    );
  });
});
