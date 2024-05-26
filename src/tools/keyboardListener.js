import { computed, effect, signal } from '@preact/signals-core';
import { ref } from '../ref.js';
import { eventListener } from './eventListener.js';
import { activeElement } from './activeElement.js';
import { endToDispose } from '../helpers/endToDispose.js';

export function keyboardListener() {
  /** @type {import('../global.d.ts').Ref<Node>} */
  const targetRef = ref();
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

  const end = effect(() => kbTargetRef(isListening.value ? window : undefined));

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
