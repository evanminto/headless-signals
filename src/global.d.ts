interface Ref<T> {
  (value: T | undefined): void;
  readonly current: T | undefined;
}


type EventNameToTypeMap = {
  click: PointerEvent;
  keyup: KeyboardEvent;
  keypress: KeyboardEvent;
  keydown: KeyboardEvent;
  focus: FocusEvent;
  blur: FocusEvent;
  focusin: FocusEvent;
  focusout: FocusEvent;
  change: MediaQueryListEvent;
  dragstart: DragEvent;
  dragend: DragEvent;
  dragenter: DragEvent;
  dragover: DragEvent;
  dragleave: DragEvent;
  drop: DragEvent;
  mousedown: PointerEvent;
  mouseup: PointerEvent;
  close: Event;
}; 

type EventName = keyof EventNameToTypeMap;
type EventType<Name> = Name extends EventName ? EventNameToTypeMap[Name] : Event;