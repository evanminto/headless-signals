import { describe, it, expect, beforeEach } from 'vitest';
import { mediaQuery } from '../../src/tools/mediaQuery.js';

class MockMediaQueryList extends EventTarget {
  change() {
    const event = new CustomEvent('change');
    // @ts-ignore
    event.matches = false;
    this.dispatchEvent(event);
  }

  get matches() {
    return true;
  }

  get media() {
    return '';
  }
}

describe('mediaQuery', () => {
  let list;

  beforeEach(() => {
    list = new MockMediaQueryList();
    window.matchMedia = () => list;
  });

  it('updates event and matches when media changes', () => {
    const { event, matches } = mediaQuery('(width > 200px)');

    expect(event.value).toBe(null);
    expect(matches.value).toBe(true);

    list.change();
    expect(event.value).toBeInstanceOf(Event);
    expect(matches.value).toBe(false);
  });
});
