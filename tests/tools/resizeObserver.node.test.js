/**
 * @vitest-environment node
 */
import { describe, it, expect, vitest } from 'vitest';
import { resizeObserver } from '../../src/tools/resizeObserver.js';

describe('resizeObserver (Node)', () => {
  it('does nothing', () => {
    const { entry } = resizeObserver();
    expect(entry.value).toBe(null);
  });
});
