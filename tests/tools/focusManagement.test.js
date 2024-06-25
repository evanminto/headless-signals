import { describe, it, expect } from 'vitest';
import { focusManagement } from '../../src/tools/focusManagement.js';

describe('focusManagement', () => {
  it('focuses the target element', () => {
    const { ref, isFocused, focus } = focusManagement();

    const button = document.createElement('button');
    document.body.appendChild(button);
    ref(button);

    expect(isFocused.value).toBe(false);
    focus();
    expect(isFocused.value).toBe(true);
  });

  describe('with initial target', () => {
    it('does nothing', () => {
      const button = document.createElement('button');
      const { ref, isFocused, focus } = focusManagement({ target: button });

      document.body.appendChild(button);
      ref(button);

      expect(isFocused.value).toBe(false);
      focus();
      expect(isFocused.value).toBe(true);
    });
  });
});
