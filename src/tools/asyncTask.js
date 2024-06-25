import { batch, computed, effect, signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';

/**
 * @template T
 * @typedef {import('@preact/signals-core').Signal<T>} Signal<T>
 */

/**
 * @template Data
 * @template Dependency
 * @param {(dep: Dependency) => Promise<Data> | Data} taskFn
 * @param {() => Dependency} [getDeps]
 * @param {{ autoRun?: boolean }} [options]
 */
export function asyncTask(taskFn, getDeps = () => {}, { autoRun = true } = {}) {
  /** @type {Signal<Data | null>} */
  const data = signal(null);
  const isLoading = signal(false);
  /** @type {Signal<Error | null>} */
  const error = signal(null);
  /** @type {ReturnType<typeof signal<Promise<Data>>} */
  const settled = signal(new Promise(() => {}));
  const deps = computed(getDeps);

  const getData = async () => {
    isLoading.value = true;

    try {
      const value = await taskFn(deps.value);

      batch(() => {
        data.value = value;
        error.value = null;
        isLoading.value = false;
      });

      return value;
    } catch (err) {
      batch(() => {
        data.value = null;
        error.value = err;
        isLoading.value = false;
      });

      // Don't rethrow, so that callers don't have to catch errors
      return null;
    }
  };

  const run = async () => {
    settled.value = getData();
  };

  const dispose = autoRun ? effect(run) : () => {};

  return {
    data: readonly(data),
    isLoading: readonly(isLoading),
    settled: readonly(settled),
    error: readonly(error),
    run,
    /** @deprecated */
    end: dispose,
    dispose,
  };
}
