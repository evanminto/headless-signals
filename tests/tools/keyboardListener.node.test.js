/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import { keyboardListener } from '../../src/tools/keyboardListener.js';

class MockKeyUpEvent extends Event {
  key = null;

  constructor(key) {
    super('keyup');
    this.key = key;
  }
}

describe('keyboardListener (Node)', () => {
  it('does nothing', () => {
    const { event } = keyboardListener();
    expect(event.value).toBe(null);
  });
});
