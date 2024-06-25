/**
 * @vitest-environment node
 */
import { describe, it, expect, vitest } from 'vitest';
import { mutationObserver } from '../../src/tools/mutationObserver.js';

describe('mutationObserver (Node)', () => {
  it('does nothing', async () => {
    const onMutation = vitest.fn();

    const { records } = mutationObserver({
      options: { attributes: true },
      onMutation,
    });

    expect(records.value).toEqual([]);
  });
});
