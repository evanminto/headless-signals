import { effect, signal } from '@preact/signals-core';
import { createRef } from '../ref.js';
import { readonly } from '../readonly.js';

/**
 * @template {import('../global.d.ts').EventName} EventName
 * @template {import('../global.d.ts').EventType<EventName>} EventType
 * @template {EventTarget} Target
 * @param {EventName} eventName
 * @param {(event: EventType) => void} [callback]
 * @param {{ target: Target | null }} [options]
 */
export function eventListener(eventName, callback, { target = null } = {}) {
  const targetRef = createRef(target);
  /** @type {ReturnType<typeof signal<EventType | null>>} */
  const eventSignal = signal(null);

  const end = effect(() => {
    const controller = new AbortController();
    targetRef.current?.addEventListener(
      eventName,
      /** @param {EventType} event */
      // @ts-ignore
      (event) => {
        eventSignal.value = event;
        callback?.(event);
      },
      { signal: controller.signal },
    );

    return () => controller.abort();
  });

  return { targetRef, ref: targetRef, event: readonly(eventSignal), end };
}
