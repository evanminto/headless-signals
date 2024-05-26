import { describe, it, expect } from 'vitest';
import { clock } from '../../src/tools/clock.js';

describe('clock', () => {
  it('updates based on interval', async () => {
    const { date } = clock();

    expect(date.value).toBeInstanceOf(Date);
    const start = date.value.getTime() / 1000;

    await new Promise((resolve) => {
      setTimeout(() => {
        const end = date.value.getTime() / 1000;
        expect(end).toBeCloseTo(start + 1, 1);
        resolve(true);
      }, 1000);
    });
  });
});
