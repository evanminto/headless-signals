import { describe, it, expect } from 'vitest';
import { cacheArray } from '../../src/tools/cacheArray.js';
import { signal } from '@preact/signals-core';

describe('cacheArray', () => {
  it("returns an array with the same identity as long as the keys don't change", () => {
    const arr1 = [{ id: 1 }, { id: 2 }];
    const arr2 = [{ id: 1 }, { id: 2 }];
    const arr3 = [{ id: 2 }, { id: 3 }];
    const arr = signal(arr1);

    const { result: cachedArr } = cacheArray(
      () => arr.value,
      ({ id }) => id,
    );

    expect(cachedArr.value).toBe(arr1);
    arr.value = arr2;
    expect(cachedArr.value).toBe(arr1);
    arr.value = arr3;
    expect(cachedArr.value).toBe(arr3);
  });
});
