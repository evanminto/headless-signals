export { Signal, ReadonlySignal } from '@preact/signals-core';

export interface Ref<T> {
  (value: T | undefined): void;
  readonly current: T | undefined;
}

export type EventNameToTypeMap = {
  animationcancel: AnimationEvent;
  animationend: AnimationEvent;
  animationiteration: AnimationEvent;
  animationstart: AnimationEvent;
  auxclick: PointerEvent;
  beforeinput: Event;
  blur: FocusEvent;
  change: MediaQueryListEvent | (Event & {});
  click: PointerEvent;
  close: Event;
  compositionend: CompositionEvent;
  compositionstart: CompositionEvent;
  compositionupdate: CompositionEvent;
  contextmenu: Event;
  copy: ClipboardEvent;
  cut: ClipboardEvent;
  dblclick: MouseEvent;
  dragend: DragEvent;
  dragenter: DragEvent;
  dragleave: DragEvent;
  dragover: DragEvent;
  dragstart: DragEvent;
  drop: DragEvent;
  focus: FocusEvent;
  focusin: FocusEvent;
  focusout: FocusEvent;
  fullscreenchange: Event;
  fullscreenerror: Event;
  gotpointercapture: PointerEvent;
  input: InputEvent;
  keydown: KeyboardEvent;
  keypress: KeyboardEvent;
  keyup: KeyboardEvent;
  lostpointercapture: PointerEvent;
  mousedown: MouseEvent;
  mouseenter: MouseEvent;
  mouseleave: MouseEvent;
  mousemove: MouseEvent;
  mouseout: MouseEvent;
  mouseover: MouseEvent;
  mouseup: MouseEvent;
  paste: ClipboardEvent;
  pointercancel: PointerEvent;
  pointerdown: PointerEvent;
  pointerenter: PointerEvent;
  pointerleave: PointerEvent;
  pointermove: PointerEvent;
  pointerout: PointerEvent;
  pointerover: PointerEvent;
  pointerup: PointerEvent;
  popstate: PopStateEvent;
  scroll: Event;
  scrollend: Event;
  securitypolicyviolation: SecurityPolicyViolationEvent;
  touchcancel: TouchEvent;
  touchend: TouchEvent;
  touchmove: TouchEvent;
  touchstart: TouchEvent;
  transitioncancel: TransitionEvent;
  transitionend: TransitionEvent;
  transitionrun: TransitionEvent;
  transitionstart: TransitionEvent;
  wheel: WheelEvent;
};

export type NativeEventName = keyof EventNameToTypeMap;
// Specify native events but allow arbitrary strings
export type EventName = NativeEventName | (string & {});
export type EventType<Name> = Name extends NativeEventName
  ? EventNameToTypeMap[Name]
  : Event;
