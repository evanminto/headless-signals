import { effect, signal } from "@preact/signals-core";
import { ref } from "../ref.js";
import { readonly } from "../readonly.js";

/**
 * @template T
 * @typedef {import('@preact/signals').Signal<T>} Signal<T>
 */

/**
 * @template T
 * @typedef {import('@preact/signals').ReadonlySignal<T>} ReadonlySignal<T>
 */

/**
 * @template {EventName} T
 * @template {EventTarget} Target
 * @param {T} eventName
 * @param {(event: EventType<T>) => void} [callback]
 */
export function eventListener(eventName, callback) {
  /** @type {Ref<Target>} */
  const targetRef = ref();
  /** @type {Signal<EventType<T> | null>} */
  const eventSignal = signal(null);

  const end = effect(() => {
    const controller = new AbortController();
    targetRef.current?.addEventListener(
      eventName,
      /** @param {EventType<T>} event */
      // @ts-ignore
      (event) => {
        eventSignal.value = event;
        callback?.(event);
      },
      { signal: controller.signal }
    );

    return () => controller.abort();
  });
  
  return { targetRef, ref: targetRef, event: readonly(eventSignal), end };
}
