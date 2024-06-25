import { computed, effect } from '@preact/signals-core';
import { createRef } from '../ref.js';
import { eventListener } from './eventListener.js';
import { activeElement } from './activeElement.js';
import { endToDispose } from '../helpers/endToDispose.js';

/**
 * @param {{ target?: Node | null }} [options]
 */
export function keyboardListener({ target = null } = {}) {
  const targetRef = createRef(target);
  const {
    targetRef: kbTargetRef,
    event,
    end: endListener,
  } = eventListener('keyup');
  const { element: activeEl, end: endActive } = activeElement();
  const isListeningToAll = computed(() => !targetRef.current);
  const isFocusedOnTarget = computed(
    () =>
      targetRef.current?.contains(activeEl.value) ||
      targetRef.current === activeEl.value,
  );
  const isListening = computed(
    () => isListeningToAll.value || isFocusedOnTarget.value,
  );

  const end = effect(() =>
    kbTargetRef(
      isListening.value && typeof window !== 'undefined' ? window : undefined,
    ),
  );

  return endToDispose({
    ref: targetRef,
    event,
    end: () => {
      endListener();
      endActive();
      end();
    },
  });
}
