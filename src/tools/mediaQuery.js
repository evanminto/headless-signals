import { computed } from '@preact/signals-core';
import { eventListener } from './eventListener.js';
import { endToDispose } from '../helpers/endToDispose.js';

/**
 * @param {any} obj
 * @returns {obj is MediaQueryList}
 */
function isMqList(obj) {
  return obj && 'matches' in obj && 'media' in obj;
}

/** @param {string} query */
export function mediaQuery(query) {
  const { targetRef, event, end } = eventListener('change');
  targetRef(window.matchMedia(query));

  const mqList = computed(() =>
    isMqList(targetRef.current) ? targetRef.current : null,
  );

  return endToDispose({
    event,
    matches: computed(() =>
      Boolean(event.value ? event.value?.matches : mqList.value?.matches),
    ),
    end,
    dispose: end,
  });
}
