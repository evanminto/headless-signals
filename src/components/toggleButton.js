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
  /** @type {import('../ref.js').Ref<HTMLButtonElement>} */
  const typedButtonRef = buttonRef;
  const isToggled = signal(initialIsToggled);
  const ariaPressed = computed(() => (isToggled.value ? 'true' : 'false'));
  const el = computed(() =>
    buttonRef.current instanceof HTMLButtonElement ? buttonRef.current : null,
  );
  const dispose = effect(() =>
    el.value?.setAttribute('aria-pressed', ariaPressed.value),
  );

  return {
    ref: typedButtonRef,
    isToggled: readonly(isToggled),
    dispose,
  };
}
