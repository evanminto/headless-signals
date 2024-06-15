import { signal } from '@preact/signals-core';
import { readonly } from '../readonly.js';
import { eventListener } from './eventListener.js';

export function browserHistory() {
  /** @type {Signal<any>} */
  const state = signal(null);
  const title = signal(document.title);
  const path = signal(location.pathname);

  const { event, end: endEvent } = eventListener(window, 'popstate');

  const endEffect = effect(() => {
    if (!event.value) {
      return;
    }

    state.value = event.value.state;
  });

  history.go;

  return {
    state: readonly(state),
    title: readonly(title),
    path: readonly(path),
    replaceState: (newState, newTitle, newPath) => {
      if ('history' in window) {
        history.replaceState(newState, newTitle, newPath);
        state.value = newState;
        title.value = newTitle;
        path.value = newPath;
      }
    },
    pushState: (newState, newTitle, newPath) => {
      if ('history' in window) {
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
