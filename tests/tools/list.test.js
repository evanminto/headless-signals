import { describe, it, expect } from 'vitest';
import { list } from '../../src/tools/list.js';

describe('list', () => {
  it('manages an array', () => {
    const { items, push, pop, clear, reset } = list([1, 2]);
    expect(items.value).toEqual([1, 2]);

    push(3);
    expect(items.value).toEqual([1, 2, 3]);

    pop();
    expect(items.value).toEqual([1, 2]);

    clear();
    expect(items.value).toEqual([]);

    reset();
    expect(items.value).toEqual([1, 2]);
  });
});
