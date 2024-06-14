import { computed, effect, signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';
import createPromiseWithResolvers from '../helpers/createPromiseWithResolvers.js';

/**
 * @template T
 * @typedef {import('@preact/signals-core').Signal<T>} Signal<T>
 */

/**
 * @template T
 * @typedef {{
 *   data: ReadonlySignal<T>;
 *   isLoading: ReadonlySignal<boolean>;
 *   completed: ReadonlySignal<Promise<void>>;
 *   error: ReadonlySignal<Error | null>;
 *   run: () => void;
 *   end: () => void;
 *   dispose: () => void;
 * }} AsyncTaskResult<T>
 */

/**
 * @template Data
 * @template Dependency
 * @param {(dep: Dependency) => Promise<Data> | Data} taskFn
 * @param {() => Dependency} [getDeps]
 * @param {{ autoRun?: boolean }} [options]
 * @returns {AsyncTaskResult<Data>}
 */
export function asyncTask(taskFn, getDeps = () => {}, { autoRun = true } = {}) {
  /** @type {Signal<Data | null>} */
  const data = signal(null);
  const isLoading = signal(false);
  /** @type {Signal<Error | null>} */
  const error = signal(null);
  const completed = signal(
    /** @type {typeof createPromiseWithResolvers<Data>} */ (
      createPromiseWithResolvers
    )(),
  );
  const deps = computed(getDeps);

  const run = async () => {
    isLoading.value = true;

    try {
      data.value = await taskFn(deps.value);
      completed.value = /** @type {typeof createPromiseWithResolvers<Data>} */ (
        createPromiseWithResolvers
      )();
      completed.value.resolve(data.value);
    } catch (error) {
      completed.value.reject(error);
    }

    isLoading.value = false;
  };

  const dispose = autoRun ? effect(run) : () => {};

  return {
    data: readonly(data),
    isLoading: readonly(isLoading),
    completed: computed(() => completed.value.promise),
    error: readonly(error),
    run,
    /** @deprecated */
    end: dispose,
    dispose,
  };
}
