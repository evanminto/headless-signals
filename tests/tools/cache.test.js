import { describe, it, expect } from 'vitest';
import { cache } from '../../src/tools/cache.js';
import { signal } from '@preact/signals-core';

describe('cache', () => {
  it("returns an object with the same identity as long as the key doesn't change", () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 1 };
    const obj3 = { id: 2 };
    const obj = signal(obj1);

    const { result: cachedObj } = cache(
      () => obj.value,
      (o) => o?.id?.toString() || null,
    );

    expect(cachedObj.value).toBe(obj1);
    obj.value = obj2;
    expect(cachedObj.value).toBe(obj1);
    obj.value = obj3;
    expect(cachedObj.value).toBe(obj3);
  });
});
