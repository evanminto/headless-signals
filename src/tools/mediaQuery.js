import { computed } from "@preact/signals-core";
import { eventListener } from "./eventListener.js";

/** @param {string} query */
export function mediaQuery(query) {
  const { targetRef, event, end } = eventListener('change');
  targetRef(window.matchMedia(query));

  return {
    event,
    matches: computed(() => Boolean(event.value?.matches)),
    end,
  };
}
