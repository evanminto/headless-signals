import { describe, it, expect } from 'vitest';
import { deferred } from '../../src/tools/deferred.js';

describe('deferred', () => {
  it('keeps track of the value of the Promise', async () => {
    const { value } = deferred(
      new Promise((resolve) => setTimeout(() => resolve(12345), 1000)),
    );

    expect(value.value).toBe(null);

    await new Promise((resolve) => {
      setTimeout(() => {
        expect(value.value).toBe(12345);
        resolve(true);
      }, 1000);
    });
  });
});
