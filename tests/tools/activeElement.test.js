import { describe, it, expect } from 'vitest';
import { activeElement } from '../../src/tools/activeElement.js';

describe('activeElement', () => {
  it('returns the current active element', () => {
    const { element, end } = activeElement();
    expect(element.value).toBe(null);

    const button = document.createElement('button');
    document.body.appendChild(button);
    button.focus();
    expect(element.value).toBe(button);
  });
});
