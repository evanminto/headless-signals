/**
 * @vitest-environment node
 */
import { describe, test, expect } from 'vitest';
import { focusTrap } from '../../src/tools/focusTrap.js';

describe('focusTrap (Node)', () => {
  test('does nothing', () => {
    const { toggle, trapped } = focusTrap();

    expect(trapped.value).toBe(false);
    toggle();
    expect(trapped.value).toBe(false);
  });
});
