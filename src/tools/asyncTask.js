import { computed, effect, signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';

/**
 * @template Dependency
 * @template Data
 * @param {(dep?: Dependency | void) => Promise<Data> | Data} taskFn 
 * @param {() => Dependency | void} getDeps 
 * @param {{ autoRun?: boolean }} [options]
 */
export function asyncTask(taskFn, getDeps = () => {}, { autoRun = true } = {}) {
  /** @type {import('../global.d.ts').Signal<Data | null>} */
  const data = signal(null);
  const isLoading = signal(false);
  const deps = computed(getDeps);

  const run = async () => {
    isLoading.value = true;
    data.value = await taskFn(deps.value);
    isLoading.value = false;
  };

  const end = autoRun ? effect(run) : () => {};

  return {
    data: readonly(data),
    isLoading: readonly(isLoading),
    run,
    end,
  };
}
