/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest';
import { eventListener } from '../../src/tools/eventListener.js';

class MyEvent extends Event {
  constructor() {
    super('my-event');
  }
}

describe('eventListener (Node)', () => {
  it('tracks events on target', async () => {
    let eventTriggered = false;

    const target = new EventTarget();

    const { event, targetRef } = eventListener('my-event', () => {
      eventTriggered = true;
    });

    targetRef(target);
    target.dispatchEvent(new MyEvent());

    expect(event.value).toBeInstanceOf(MyEvent);
    expect(eventTriggered).toBe(true);
  });

  describe('with initial target', () => {
    it('tracks events on target', async () => {
      let eventTriggered = false;

      const target = new EventTarget();

      const { event } = eventListener(
        'my-event',
        () => {
          eventTriggered = true;
        },
        { target },
      );

      target.dispatchEvent(new MyEvent());

      expect(event.value).toBeInstanceOf(MyEvent);
      expect(eventTriggered).toBe(true);
    });
  });
});
