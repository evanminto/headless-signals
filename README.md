# Headless Signals

Experimental collection of headless components/hooks, implemented with Preact
Signals.

## Getting Started

Install with NPM...

```sh
npm install @evanminto/headless-signals
```

...or Yarn.

```sh
yarn add @evanminto/headless-signals
```

Then import in your JavaScript:

```js
import {
  // Tools
  activeElement,
  applyProps,
  asyncTask,
  browserHistory,
  cache,
  clipboard,
  clock,
  deferred,
  draggable,
  droppable,
  eventListener,
  focusManagement,
  focusTrap,
  keyboardListener,
  list,
  liveSelectors,
  mediaQuery,
  mousedown,
  mutationObserver,
  resizeObserver,
  toggleValue,

  // Components
  reorderableList,
  showPassword,
  toggleButton,

  // Preact hooks
  useHeadlessSignals,
  useModalControl,
  useReorderableList,
} from '@evanminto/headless-signals';
```

## Future Plans

This project is very much a WIP, and I plan on adding more docs in the future.

As the TC39 Signals proposal continues through the standards process, I will
hopefully be able to rewrite this library to use TC39 Signals instead.
