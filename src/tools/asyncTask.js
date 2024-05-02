import { effect, signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';
import { deferred } from './deferred.js';

/**
 * @template T
 * @typedef {import('@preact/signals').Signal<T>} Signal<T>
 */

/**
 * @template {Array} Args
 * @template Result
 * @param {(args: Args) => Promise<Result> | Result} taskFn 
 * @param {() => Args} getArgs 
 * @param {{ autoRun?: boolean }} [options]
 */
export function asyncTask(taskFn, getArgs, { autoRun = true } = {}) {
  /** @type {Signal<Result | null>} */
  const result = signal(null);
  const loading = signal(false);
  const run = async () => {
    loading.value = true;
    result.value = await taskFn(getArgs());
    loading.value = false;
  };

  const end = autoRun ? effect(run) : () => {};

  return {
    result: readonly(result),
    loading: readonly(loading),
    run,
    end,
  };
}
