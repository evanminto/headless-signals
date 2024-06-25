import { describe, test, expect } from 'vitest';
import { focusTrap } from '../../src/tools/focusTrap.js';

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

  describe('with initial target', () => {
    test('smoke test', () => {
      const container = document.createElement('div');
      const { toggle, trapped } = focusTrap({ target: container });

      const button = document.createElement('button');
      container.appendChild(button);
      document.body.appendChild(container);

      expect(trapped.value).toBe(false);

      toggle();
      expect(trapped.value).toBe(true);
    });
  });
});
