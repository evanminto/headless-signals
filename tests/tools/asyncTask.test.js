import { describe, it, expect } from 'vitest';
import { asyncTask } from '../../src/tools/asyncTask.js';

describe('asyncTask', () => {
  it('returns the current data from the task and its loading state', async () => {
    const { data, isLoading } = asyncTask(
      () => new Promise((resolve) => setTimeout(() => resolve(12345), 1000)),
    );

    expect(data.value).toBe(null);
    expect(isLoading.value).toBe(true);

    await new Promise((done) => {
      setTimeout(() => {
        expect(data.value).toBe(12345);
        expect(isLoading.value).toBe(false);
        done(true);
      }, 2000);
    });
  });
});
