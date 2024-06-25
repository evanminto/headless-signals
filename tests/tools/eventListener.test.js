import { describe, it, expect } from 'vitest';
import { eventListener } from '../../src/tools/eventListener.js';

describe('eventListener', () => {
  it('tracks events on target', async () => {
    let eventTriggered = false;

    const button = document.createElement('button');

    const { event, targetRef } = eventListener('click', (event) => {
      eventTriggered = true;
    });

    targetRef(button);
    document.body.appendChild(button);
    button.click();

    expect(event.value).toBeInstanceOf(Event);
    expect(eventTriggered).toBe(true);
  });

  describe('with initial target', () => {
    it('tracks events on target', async () => {
      let eventTriggered = false;

      const button = document.createElement('button');

      const { event } = eventListener(
        'click',
        (event) => {
          eventTriggered = true;
        },
        { target: button },
      );

      document.body.appendChild(button);
      button.click();

      expect(event.value).toBeInstanceOf(Event);
      expect(eventTriggered).toBe(true);
    });
  });
});
