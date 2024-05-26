import { computed, effect, signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';
import { eventListener } from '../tools/eventListener.js';

/**
 * @param {boolean} [initialIsToggled]
 */
export function toggleButton(initialIsToggled = false) {
  const { ref: buttonRef } = eventListener(
    'click',
    () => (isToggled.value = !isToggled.value),
  );
  const isToggled = signal(initialIsToggled);
  const ariaPressed = computed(() => (isToggled.value ? 'true' : 'false'));
  const el = computed(() =>
    buttonRef.current instanceof HTMLButtonElement ? buttonRef.current : null,
  );
  const dispose = effect(() =>
    el.value?.setAttribute('aria-pressed', ariaPressed.value),
  );

  return {
    /** @type {import('../global.d.ts').Ref<HTMLButtonElement>} */
    // @ts-ignore
    ref: buttonRef,
    isToggled: readonly(isToggled),
    dispose,
  };
}
