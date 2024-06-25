import { describe, it, expect } from 'vitest';
import { keyboardListener } from '../../src/tools/keyboardListener.js';

class MockKeyUpEvent extends Event {
  key = null;

  constructor(key) {
    super('keyup');
    this.key = key;
  }
}

describe('keyboardListener', () => {
  it('listens to keypresses anywhere', () => {
    const { event } = keyboardListener();

    expect(event.value).toBe(null);

    window.dispatchEvent(new MockKeyUpEvent('a'));

    expect(event.value).toBeInstanceOf(MockKeyUpEvent);
    expect(event.value?.key).toBe('a');

    window.dispatchEvent(new MockKeyUpEvent('b'));

    expect(event.value).toBeInstanceOf(MockKeyUpEvent);
    expect(event.value?.key).toBe('b');
  });

  it('listens to keypresses only when focused on the target', () => {
    const { ref, event } = keyboardListener();

    const input = document.createElement('input');
    document.body.appendChild(input);
    ref(input);

    expect(event.value).toBe(null);

    input.focus();
    window.dispatchEvent(new MockKeyUpEvent('a'));

    expect(event.value).toBeInstanceOf(MockKeyUpEvent);
    expect(event.value?.key).toBe('a');

    input.blur();
    window.dispatchEvent(new MockKeyUpEvent('b'));

    expect(event.value).toBeInstanceOf(MockKeyUpEvent);
    expect(event.value?.key).toBe('a');
  });

  describe('with initial target', () => {
    it('listens to keypresses only when focused on the target', () => {
      const input = document.createElement('input');
      const { ref, event } = keyboardListener({ target: input });

      document.body.appendChild(input);
      ref(input);

      expect(event.value).toBe(null);

      input.focus();
      window.dispatchEvent(new MockKeyUpEvent('a'));

      expect(event.value).toBeInstanceOf(MockKeyUpEvent);
      expect(event.value?.key).toBe('a');

      input.blur();
      window.dispatchEvent(new MockKeyUpEvent('b'));

      expect(event.value).toBeInstanceOf(MockKeyUpEvent);
      expect(event.value?.key).toBe('a');
    });
  });
});
