import { useEffect, useMemo, useRef } from 'preact/hooks';

const registry = new FinalizationRegistry(cleanupRef => {
  cleanupRef.current && cleanupRef.current(); // cleanup on unmount
});

/**
 * A version of useMemo that allows cleanup. Return a tuple from the callback:
 * [returnValue, cleanupFunction]
 * @template T
 * @template {readonly any[]} Dependencies
 * @param {() => [T, () => void] | [T]} callback
 * @param {Dependencies} deps
 */
export default function useMemoCleanup(callback, deps) {
  /** @type {import('preact/hooks').MutableRef<(() => void) | null>} */
  const cleanupRef = useRef(null); // holds a cleanup value
  const unmountRef = useRef(false); // the GC-triggering candidate

  if(!unmountRef.current) {
      unmountRef.current = true;
      // this works since refs are preserved for the component's lifetime
      registry.register(unmountRef, cleanupRef);
  }

  const returned = useMemo(() => {
      cleanupRef.current && cleanupRef.current();
      cleanupRef.current = null;

      const [returned, cleanup] = callback();
      cleanupRef.current = typeof cleanup === "function" ? cleanup : null;

      return returned;
  }, deps);

  return returned;
}


/**
 * @template {{ end?: () => void; dispose?: () => void }} Result
 * @template {(ReadonlyArray<any> | readonly [any])} Dependencies
 * @template {() => Result} CreateHeadlessSignalFn
 * @param {CreateHeadlessSignalFn} createHeadlessSignal 
 * @param {Dependencies} [dependencies]
 * @returns {ReturnType<CreateHeadlessSignalFn>}
 */
export function useHeadlessSignals(
  createHeadlessSignal,
  // @ts-ignore
  dependencies = []
) {
  const result = useMemoCleanup(() => {
    const result = createHeadlessSignal();

    if (result.end || result.dispose) {
      const { end, dispose, ...rest } = result;
      const cleanup = () => {
        if (dispose) {
          dispose();
        } else if (end) {
          end();
        }
      };

      return [rest, cleanup];
    }

    return [result];
  }, dependencies);

  // @ts-ignore
  return result;
}