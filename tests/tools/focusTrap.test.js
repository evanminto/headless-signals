import { describe, test, expect } from 'vitest';
import { focusTrap } from '../../src/tools/focusTrap.js';

class MockKeyUpEvent extends Event {
  key = null;

  constructor(key) {
    super('keyup');
    this.key = key;
  }
}

describe('focusTrap', () => {
  test('smoke test', () => {
    const { ref, toggle, trapped } = focusTrap();

    const container = document.createElement('div');
    const button = document.createElement('button');
    container.appendChild(button);
    document.body.appendChild(container);
    ref(container);

    expect(trapped.value).toBe(false);

    toggle();
    expect(trapped.value).toBe(true);
  });
});
