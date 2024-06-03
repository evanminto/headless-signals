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

Then import in your JavaScript using any of the following styles:

```js
// Contains all exports
import { clipboard } from '@evanminto/headless-signals';

// Contains only full-featured headless UI components
import {
  reorderableList,
  showPassword,
  toggleButton,
} from '@evanminto/headless-signals/components';

// Contains only single-responsibility tools/hooks
import {
  activeElement,
  asyncTask,
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
  mediaQuery,
  mousedown,
  mutationObserver,
  resizeObserver,
  toggleValue,
} from '@evanminto/headless-signals/tools';

// Contains Preact bindings for many components/tools
import {
  useHeadlessSignals,
  useModalControl,
  useReorderableList,
} from '@evanminto/headless-signals/preact';
```

## Future Plans

This project is very much a WIP, and I plan on adding more docs in the future.

As the TC39 Signals proposal continues through the standards process, I will
hopefully be able to rewrite this library to use TC39 Signals instead.
