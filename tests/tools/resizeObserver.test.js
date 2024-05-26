import { describe, it, expect, vitest } from 'vitest';
import { resizeObserver } from '../../src/tools/resizeObserver.js';

describe('resizeObserver', () => {
  it("instantiates a ResizeObserver (JSDOM doesn't support it so we can't test its behavior)", () => {
    const construct = vitest.fn();

    // @ts-ignore
    window.ResizeObserver = class MockResizeObserver {
      constructor() {
        construct();
      }

      observe() {}
    };

    const { ref, entry } = resizeObserver();

    const target = document.createElement('div');
    ref(target);

    expect(construct).toHaveBeenCalledOnce();
  });
});
