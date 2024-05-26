import { describe, it, expect } from 'vitest';
import { clipboard } from '../../src/tools/clipboard.js';

// Mock clipboard
// @ts-ignore
Navigator.prototype.clipboard = {
  writeText(_text) {
    return Promise.resolve();
  },
};

describe('clipboard', () => {
  it('copies to clipboard and keeps track of copied state', async () => {
    const { copied, copy } = clipboard();

    expect(copied.value).toBe(false);
    await copy();
    expect(copied.value).toBe(true);
  });
});
