import { describe, it, expect } from 'vitest';
import { focusManagement } from '../../src/tools/focusManagement.js';

class MockKeyUpEvent extends Event {
  key = null;

  constructor(key) {
    super('keyup');
    this.key = key;
  }
}

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
});
