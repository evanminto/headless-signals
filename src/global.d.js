/**
 * @template T
 * @typedef {import('@preact/signals-core').Signal<T>} Signal<T>
 */

/**
 * @template T
 * @typedef {import('@preact/signals-core').ReadonlySignal<T>} ReadonlySignal<T>
 */

/**
 * @template T
 * @typedef {{
 *   (value: T | undefined): void;
 *   readonly current: T | undefined;
 * }} Ref<T>
 */

/**
 * @typedef {{
 *   click: PointerEvent;
 *   keyup: KeyboardEvent;
 *   keypress: KeyboardEvent;
 *   keydown: KeyboardEvent;
 *   focus: FocusEvent;
 *   blur: FocusEvent;
 *   focusin: FocusEvent;
 *   focusout: FocusEvent;
 *   change: MediaQueryListEvent;
 *   dragstart: DragEvent;
 *   dragend: DragEvent;
 *   dragenter: DragEvent;
 *   dragover: DragEvent;
 *   dragleave: DragEvent;
 *   drop: DragEvent;
 *   mousedown: PointerEvent;
 *   mouseup: PointerEvent;
 *   close: Event;
 * }} EventNameToTypeMap
 */

/**
 * @typedef {keyof EventNameToTypeMap} EventName
 */

/**
 * @template Name
 * @typedef {Name extends EventName
 *   ? EventNameToTypeMap[Name]
 *   : Event} EventType<Name>
 */
