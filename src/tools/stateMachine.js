import { computed, effect, signal } from '@preact/signals-core';

/**
 * A simple signal-based state machine
 *
 * @template {string} State
 * @template {string} StateEvent
 * @param {State} initialValue
 * @param {Partial<Record<State, {
 *   on?: Partial<Record<StateEvent, State>>;
 *   effect?: () => void | (() => () => void);
 * }>>} map
 */
export function stateMachine(initialValue, map) {
  const state = signal(initialValue);

  return {
    signal: computed(() => state.value),

    /** @param {StateEvent} event */
    send: (event) => {
      const newState = map[state.value]?.on?.[event];

      if (newState) {
        state.value = newState;
      }
    },

    dispose: effect(() => map[state.value]?.effect?.()),
  };
}
