import { computed, signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';
import { eventListener } from './eventListener.js';

export function browserHistory() {
  /** @type {ReturnType<typeof signal<any>>} */
  const state = signal(null);
  const title = signal(document.title);
  const path = signal(location.pathname);

  const { ref, event, end: endEvent } = eventListener('popstate');

  if (typeof window !== 'undefined') {
    ref(window);
  }

  const endEffect = effect(() => {
    if (!event.value) {
      return;
    }

    state.value = event.value.state;
  });

  return {
    state: readonly(state),
    title: readonly(title),
    path: readonly(path),
    replaceState: (newState, newTitle, newPath) => {
      if (typeof window !== 'undefined' && 'history' in window) {
        history.replaceState(newState, newTitle, newPath);
        state.value = newState;
        title.value = newTitle;
        path.value = newPath;
      }
    },
    pushState: (newState, newTitle, newPath) => {
      if (typeof window !== 'undefined' && 'history' in window) {
        history.pushState(newState, newTitle, newPath);
        state.value = newState;
        title.value = newTitle;
        path.value = newPath;
      }
    },
    end: () => {
      endEvent();
      endEffect();
    },
  };
}
