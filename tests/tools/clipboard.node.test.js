/**
 * @vitest-environment node
 */

import { describe, it, expect } from 'vitest';
import { clipboard } from '../../src/tools/clipboard.js';

describe('clipboard (Node)', () => {
  it("doesn't copy", async () => {
    const { copied, copy } = clipboard();

    expect(copied.value).toBe(false);
    await copy();
    expect(copied.value).toBe(false);
  });
});
