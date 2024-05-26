import { describe, it, expect, vitest } from 'vitest';
import { toggleValue } from '../../src/tools/toggleValue.js';

describe('toggleValue', () => {
  it('toggles boolean value', () => {
    const { on, toggle } = toggleValue();

    expect(on.value).toBe(false);

    toggle();
    expect(on.value).toBe(true);
  });
});
