/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import { focusManagement } from '../../src/tools/focusManagement.js';

describe('focusManagement (Node)', () => {
  it('does nothing', () => {
    const { isFocused, focus } = focusManagement();

    expect(isFocused.value).toBe(false);
    focus();
    expect(isFocused.value).toBe(false);
  });
});
