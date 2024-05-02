import { modalControl } from "../components/modalControl.js";
import { useHeadlessSignals } from "./useHeadlessSignals.js";

/**
 * @param {Parameters<typeof modalControl>[0]} [options]
 */
export function useModalControl(options) {
  return useHeadlessSignals(
    () => modalControl(options),
    [options?.action, options?.lightDismiss]
  );
}