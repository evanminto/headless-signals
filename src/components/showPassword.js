import { computed, signal } from "@preact/signals-core";
import { readonly } from "../readonly.js";

export function showPassword(show = false) {
  const visible = signal(show);

  return {
    visible: readonly(visible),
    inputType: computed(() => visible.value ? 'text' : 'password'),
    toggle() {
      visible.value = !visible.value;
    },
  };
}