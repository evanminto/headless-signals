import { ReadonlySignal } from '@preact/signals-core';

export type AsyncTaskResult<Data> = {
  data: ReadonlySignal<Data>;
  isLoading: ReadonlySignal<boolean>;
  completed: ReadonlySignal<Promise<void>>;
  run: () => void;
  /** @deprecated */
  end: () => void;
  dispose: () => void;
};
