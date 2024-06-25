/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import { activeElement } from '../../src/tools/activeElement.js';

describe('activeElement (Node)', () => {
  it('returns nothing', () => {
    const { element } = activeElement();
    expect(element.value).toBe(null);
  });
});
