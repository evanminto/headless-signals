import { reorderableList } from "../components/reorderableList.js";
import { useHeadlessSignals } from "./useHeadlessSignals.js";

/**
 * @template T
 * @param {Parameters<typeof reorderableList<T>>[0]} [list]
 */
export function useReorderableList(list = []) {
  return useHeadlessSignals(() => reorderableList(list), [list]);
}