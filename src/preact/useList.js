import { useHeadlessSignals } from './useHeadlessSignals.js';
import { list } from '../tools/list.js';
import { useSignal } from '@preact/signals';

/**
 * @param {Parameters<typeof list>[0]} [initialValue]
 */
export function useList(initialValue) {
  return useHeadlessSignals(() => list(initialValue), [initialValue]);
}
