import { effect, signal } from "@preact/signals-core";
import { ref } from "../ref.js";
import { readonly } from "../readonly.js";

/**
 * @template {import('../global.d.ts').EventName} T
 * @template {EventTarget} Target
 * @param {T} eventName
 * @param {(event: import('../global.d.ts').EventType<T>) => void} [callback]
 */
export function eventListener(eventName, callback) {
  /** @type {import('../global.d.ts').Ref<Target>} */
  const targetRef = ref();
  /** @type {import('../global.d.ts').Signal<import('../global.d.ts').EventType<T> | null>} */
  const eventSignal = signal(null);

  const end = effect(() => {
    const controller = new AbortController();
    targetRef.current?.addEventListener(
      eventName,
      /** @param {import('../global.d.ts').EventType<T>} event */
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
