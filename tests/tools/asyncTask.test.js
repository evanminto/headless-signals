import { describe, it, expect } from 'vitest';
import { asyncTask } from '../../src/tools/asyncTask.js';
import { signal } from '@preact/signals-core';

describe('asyncTask', () => {
  it('returns the current data from the task and its loading state', async () => {
    const { data, isLoading } = asyncTask(
      () => new Promise((resolve) => setTimeout(() => resolve(12345), 250)),
    );

    expect(data.value).toBe(null);
    expect(isLoading.value).toBe(true);

    await new Promise((done) => {
      setTimeout(() => {
        expect(data.value).toBe(12345);
        expect(isLoading.value).toBe(false);
        done(true);
      }, 300);
    });
  });

  it('returns a promise that resolves when the task completes', async () => {
    const { settled, error } = asyncTask(
      () => new Promise((resolve) => setTimeout(() => resolve(12345), 250)),
    );

    expect(settled.value).toBeInstanceOf(Promise);

    const data = await settled.value;

    expect(data).toBe(12345);
    expect(error.value).toBe(null);
  });

  it('returns the error', async () => {
    const mockError = new Error();

    const { data, error, isLoading } = asyncTask(
      () =>
        new Promise((_resolve, reject) =>
          setTimeout(() => reject(mockError), 250),
        ),
    );

    expect(data.value).toBe(null);
    expect(error.value).toBe(null);
    expect(isLoading.value).toBe(true);

    await new Promise((done) => {
      setTimeout(() => {
        expect(data.value).toBe(null);
        expect(isLoading.value).toBe(false);
        expect(error.value).toBe(mockError);
        done(true);
      }, 300);
    });
  });

  it('returns a promise that resolves when the task throws an error', async () => {
    const mockError = new Error();

    const { settled, error } = asyncTask(
      () =>
        new Promise((_resolve, reject) =>
          setTimeout(() => reject(mockError), 250),
        ),
    );

    expect(settled.value).toBeInstanceOf(Promise);

    const data = await settled.value;

    expect(data).toBe(null);
    expect(error.value).toBe(mockError);
  });

  it('updates based on dependencies', async () => {
    const mockError = new Error();
    /** @type {ReturnType<typeof signal<() => string | null>} */
    const getResult = signal(() => null);

    const { data, error, isLoading } = asyncTask(
      (getResult) =>
        new Promise((resolve, reject) =>
          setTimeout(() => {
            try {
              resolve(getResult());
            } catch (err) {
              reject(err);
            }
          }, 250),
        ),
      () => getResult.value,
    );

    expect(data.value).toBe(null);
    expect(error.value).toBe(null);
    expect(isLoading.value).toBe(true);

    getResult.value = () => '12345';
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(data.value).toBe('12345');
    expect(isLoading.value).toBe(false);
    expect(error.value).toBe(null);

    getResult.value = () => {
      throw mockError;
    };
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(data.value).toBe(null);
    expect(isLoading.value).toBe(false);
    expect(error.value).toBe(mockError);
  });
});
