import { computed, effect, signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';
import createPromiseWithResolvers from '../helpers/createPromiseWithResolvers.js';

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
  const typedCreatePromise =
    /** @type {typeof createPromiseWithResolvers<Data>} */ (
      createPromiseWithResolvers
    );

  /** @type {Signal<Data | null>} */
  const data = signal(null);
  const isLoading = signal(false);
  /** @type {Signal<Error | null>} */
  const error = signal(null);
  const completed = signal(typedCreatePromise());
  const deps = computed(getDeps);

  const run = async () => {
    isLoading.value = true;

    try {
      // Create a new promise
      completed.value = typedCreatePromise();

      data.value = await taskFn(deps.value);
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
