import { computed } from '@preact/signals-core';
import { readonly } from '../readonly.js';
import { toggleValue } from '../tools/toggleValue.js';

export function showPassword(show = false) {
  const { on: visible, toggle } = toggleValue(show);

  return {
    visible: readonly(visible),
    inputType: computed(() => (visible.value ? 'text' : 'password')),
    toggle,
  };
}
