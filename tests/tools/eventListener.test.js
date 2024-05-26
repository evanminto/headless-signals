import { describe, it, expect } from 'vitest';
import { eventListener } from '../../src/tools/eventListener.js';

describe('eventListener', () => {
  it('tracks events on target', async () => {
    let eventTriggered = false;

    const { event, targetRef } = eventListener('click', (event) => {
      eventTriggered = true;
    });

    const button = document.createElement('button');
    targetRef(button);
    document.body.appendChild(button);
    button.click();

    expect(event.value).toBeInstanceOf(Event);
    expect(eventTriggered).toBe(true);
  });
});
