import {signal as $dxdRC$signal, effect as $dxdRC$effect, computed as $dxdRC$computed} from "@preact/signals-core";
import {useRef as $dxdRC$useRef, useMemo as $dxdRC$useMemo} from "preact/hooks";


function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $c7a04e039d7a3c20$exports = {};
var $9be4f47e7377fcd6$exports = {};

$parcel$export($9be4f47e7377fcd6$exports, "reorderableList", () => $9be4f47e7377fcd6$export$3477e6bdf0907486);


function $0bc857c25723e53f$export$6ec456bd5b7b3c51(signal) {
    return (0, $dxdRC$computed)(()=>signal.value);
}



function $18e8e14b82c9968b$export$eff4d24c3ff7876e(initialValue) {
    const refSignal = (0, $dxdRC$signal)(initialValue);
    /**
   * @param {T | undefined} value 
   * @returns {void}
   */ const refFn = (value)=>{
        refSignal.value = value;
    };
    Object.defineProperty(refFn, "current", {
        get () {
            return refSignal.value;
        },
        enumerable: false,
        configurable: false
    });
    return refFn;
}
function $18e8e14b82c9968b$export$3bca459d1b2dcaa8(refs) {
    /** @type {import('./global.d.ts').Ref<T>} */ const newRef = $18e8e14b82c9968b$export$eff4d24c3ff7876e();
    (0, $dxdRC$effect)(()=>{
        refs.forEach((ref)=>ref(newRef.current));
    });
    return newRef;
}


var $d35fc60e7f4dc40d$exports = {};

$parcel$export($d35fc60e7f4dc40d$exports, "draggable", () => $d35fc60e7f4dc40d$export$c746a5152d4ba26c);
$parcel$export($d35fc60e7f4dc40d$exports, "droppable", () => $d35fc60e7f4dc40d$export$c4e9c468fa5fa70a);



var $2f63d4d464643d2d$exports = {};

$parcel$export($2f63d4d464643d2d$exports, "eventListener", () => $2f63d4d464643d2d$export$f5cdf3809b4587f3);



function $2f63d4d464643d2d$export$f5cdf3809b4587f3(eventName, callback) {
    /** @type {import('../global.d.ts').Ref<Target>} */ const targetRef = (0, $18e8e14b82c9968b$export$eff4d24c3ff7876e)();
    /** @type {import('../global.d.ts').Signal<import('../global.d.ts').EventType<T> | null>} */ const eventSignal = (0, $dxdRC$signal)(null);
    const end = (0, $dxdRC$effect)(()=>{
        const controller = new AbortController();
        targetRef.current?.addEventListener(eventName, /** @param {import('../global.d.ts').EventType<T>} event */ // @ts-ignore
        (event)=>{
            eventSignal.value = event;
            callback?.(event);
        }, {
            signal: controller.signal
        });
        return ()=>controller.abort();
    });
    return {
        targetRef: targetRef,
        ref: targetRef,
        event: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(eventSignal),
        end: end
    };
}


var $d87276b39fcdfd94$exports = {};

$parcel$export($d87276b39fcdfd94$exports, "mousedown", () => $d87276b39fcdfd94$export$8b0cb8993e7a9391);




function $d87276b39fcdfd94$export$8b0cb8993e7a9391() {
    const down = (0, $dxdRC$signal)(false);
    const { ref: mousedownRef, end: endMousedown } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("mousedown", ()=>down.value = true);
    const { ref: mouseupRef, end: endMouseup } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("mouseup", ()=>down.value = false);
    const end = ()=>{
        endMousedown();
        endMouseup();
    };
    return {
        /** @type {import('../global.d.ts').Ref<Element>} */ // @ts-ignore
        ref: (0, $18e8e14b82c9968b$export$3bca459d1b2dcaa8)([
            mousedownRef,
            mouseupRef
        ]),
        down: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(down),
        end: end,
        dispose: end
    };
}


function $d35fc60e7f4dc40d$export$c746a5152d4ba26c({ getData: getData } = {}) {
    const dragging = (0, $dxdRC$signal)(false);
    /** @type {ReturnType<typeof eventListener<'dragstart', HTMLElement>>} */ const { ref: dragstartRef, end: endDragstart } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("dragstart", (event)=>{
        dragging.value = true;
        if (getData) event.dataTransfer?.setData(...getData(event));
    });
    /** @type {ReturnType<typeof eventListener<'dragend', HTMLElement>>} */ const { ref: dragendRef, end: endDragend } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("dragend", ()=>{
        dragging.value = false;
    });
    const { ref: handleRef, down: mouseIsDownOnHandle, end: endMousedown } = (0, $d87276b39fcdfd94$export$8b0cb8993e7a9391)();
    const targetRef = (0, $18e8e14b82c9968b$export$3bca459d1b2dcaa8)([
        dragstartRef,
        dragendRef
    ]);
    const isDraggable = (0, $dxdRC$computed)(()=>!handleRef.current || mouseIsDownOnHandle.value);
    const end = (0, $dxdRC$effect)(()=>{
        const target = targetRef.current;
        if (target) target.draggable = isDraggable.value;
    });
    return {
        ref: targetRef,
        handleRef: handleRef,
        dragging: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(dragging),
        end: ()=>{
            end();
            endDragstart();
            endDragend();
            endMousedown();
        }
    };
}
function $d35fc60e7f4dc40d$export$c4e9c468fa5fa70a({ onDrop: onDrop } = {}) {
    const dropping = (0, $dxdRC$signal)(false);
    /** @type {ReturnType<typeof eventListener<'dragenter', HTMLElement>>} */ const { ref: dragenterRef, end: endDragenter } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("dragenter", (event)=>{
        event.preventDefault();
        dropping.value = true;
    });
    /** @type {ReturnType<typeof eventListener<'dragover', HTMLElement>>} */ const { ref: dragoverRef, end: endDragover } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("dragover", (event)=>event.preventDefault());
    /** @type {ReturnType<typeof eventListener<'dragleave', HTMLElement>>} */ const { ref: dragleaveRef, end: endDragleave } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("dragleave", (event)=>{
        event.preventDefault();
        const { clientX: clientX, clientY: clientY } = event;
        const rect = dragleaveRef.current?.getBoundingClientRect();
        if (rect && (clientY <= rect.top || clientY >= rect.bottom || clientX <= rect.left || clientX >= rect.right)) dropping.value = false;
    });
    /** @type {ReturnType<typeof eventListener<'drop', HTMLElement>>} */ const { ref: dropRef, end: endDrop } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("drop", (event)=>{
        dropping.value = false;
        onDrop?.(event);
    });
    const targetRef = (0, $18e8e14b82c9968b$export$3bca459d1b2dcaa8)([
        dragenterRef,
        dragoverRef,
        dragleaveRef,
        dropRef
    ]);
    return {
        ref: targetRef,
        dropping: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(dropping),
        end: ()=>{
            endDragenter();
            endDragover();
            endDragleave();
            endDrop();
        }
    };
}


function $9be4f47e7377fcd6$export$3477e6bdf0907486(items = []) {
    const itemsSignal = (0, $dxdRC$signal)(items);
    /**
   * @type {import('../global.d.ts').Signal<{
   *   item: T;
   *   dragging: import('../global.d.ts').ReadonlySignal<boolean>;
   *   dropping: import('../global.d.ts').ReadonlySignal<boolean>;
   *   ref: import('../global.d.ts').Ref<HTMLElement>;
   *   handleRef: import('../global.d.ts').Ref<Element>;
   *   draggableRef: import('../global.d.ts').Ref<HTMLElement>;
   *   droppableRef: import('../global.d.ts').Ref<HTMLElement>;
   *   moveUp: () => void;
   *   moveDown: () => void;
   *   moveToTop: () => void;
   * }[]>}
   */ const wrappedItemsSignal = (0, $dxdRC$signal)([]);
    /**
   * @param {number} from 
   * @param {number} to 
   */ function moveToIndex(from, to) {
        const arr = [
            ...itemsSignal.value
        ];
        if (to < 0 || to > arr.length - 1) return;
        const element = arr.splice(from, 1)[0];
        arr.splice(to, 0, element);
        itemsSignal.value = arr;
    }
    const end = (0, $dxdRC$effect)(()=>{
        const wrappedItems = itemsSignal.value.map((item, index)=>{
            const { ref: draggableRef, handleRef: handleRef, dragging: dragging, end: endDraggable } = (0, $d35fc60e7f4dc40d$export$c746a5152d4ba26c)({
                getData: ()=>[
                        "text",
                        index.toString()
                    ]
            });
            const { ref: droppableRef, dropping: dropping, end: endDroppable } = (0, $d35fc60e7f4dc40d$export$c4e9c468fa5fa70a)({
                onDrop: (event)=>{
                    const data = event.dataTransfer?.getData("text");
                    if (data) moveToIndex(parseInt(data, 10), index);
                }
            });
            return {
                item: item,
                dragging: dragging,
                dropping: dropping,
                ref: (0, $18e8e14b82c9968b$export$3bca459d1b2dcaa8)([
                    draggableRef,
                    droppableRef
                ]),
                handleRef: handleRef,
                draggableRef: draggableRef,
                droppableRef: droppableRef,
                moveUp: ()=>moveToIndex(index, index - 1),
                moveDown: ()=>moveToIndex(index, index + 1),
                moveToTop: ()=>moveToIndex(index, 0),
                end: ()=>{
                    endDraggable();
                    endDroppable();
                }
            };
        }).flat();
        wrappedItemsSignal.value = wrappedItems.map(({ end: end, ...item })=>item);
        return ()=>wrappedItems.forEach(({ end: end })=>end());
    });
    return {
        items: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(wrappedItemsSignal),
        end: end
    };
}


var $5fa1aef9032e25cb$exports = {};

$parcel$export($5fa1aef9032e25cb$exports, "showPassword", () => $5fa1aef9032e25cb$export$a7fa1077ed92634a);



function $5fa1aef9032e25cb$export$a7fa1077ed92634a(show = false) {
    const { on: visible, toggle: toggle } = (0, $5fa1aef9032e25cb$import$aec1c10f85acd250$d67dea09654f2d07)(show);
    return {
        visible: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(visible),
        inputType: (0, $dxdRC$computed)(()=>visible.value ? "text" : "password"),
        toggle: toggle
    };
}


var $9451e01af4218bca$exports = {};

$parcel$export($9451e01af4218bca$exports, "toggleButton", () => $9451e01af4218bca$export$c3f9788a1ddcf2d9);



function $9451e01af4218bca$export$c3f9788a1ddcf2d9(initialIsToggled = false) {
    const { ref: buttonRef } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("click", ()=>isToggled.value = !isToggled.value);
    const isToggled = (0, $dxdRC$signal)(initialIsToggled);
    const ariaPressed = (0, $dxdRC$computed)(()=>isToggled.value ? "true" : "false");
    const el = (0, $dxdRC$computed)(()=>buttonRef.current instanceof HTMLButtonElement ? buttonRef.current : null);
    const dispose = (0, $dxdRC$effect)(()=>el.value?.setAttribute("aria-pressed", ariaPressed.value));
    return {
        /** @type {import('../global.d.ts').Ref<HTMLButtonElement>} */ // @ts-ignore
        ref: buttonRef,
        isToggled: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(isToggled),
        dispose: dispose
    };
}


$parcel$exportWildcard($c7a04e039d7a3c20$exports, $9be4f47e7377fcd6$exports);
$parcel$exportWildcard($c7a04e039d7a3c20$exports, $5fa1aef9032e25cb$exports);
$parcel$exportWildcard($c7a04e039d7a3c20$exports, $9451e01af4218bca$exports);


var $5979c6e85e5cd012$exports = {};
var $963a274682f2cae3$exports = {};

$parcel$export($963a274682f2cae3$exports, "useHeadlessSignals", () => $963a274682f2cae3$export$7a9439f340ec21a2);

const $963a274682f2cae3$var$registry = new FinalizationRegistry((cleanupRef)=>{
    cleanupRef.current && cleanupRef.current(); // cleanup on unmount
});
/**
 * A version of useMemo that allows cleanup. Return a tuple from the callback:
 * [returnValue, cleanupFunction]
 * @template T
 * @template {readonly any[]} Dependencies
 * @param {() => [T, () => void] | [T]} callback
 * @param {Dependencies} deps
 */ function $963a274682f2cae3$var$useMemoCleanup(callback, deps) {
    /** @type {import('preact/hooks').MutableRef<(() => void) | null>} */ const cleanupRef = (0, $dxdRC$useRef)(null); // holds a cleanup value
    const unmountRef = (0, $dxdRC$useRef)(false); // the GC-triggering candidate
    if (!unmountRef.current) {
        unmountRef.current = true;
        // this works since refs are preserved for the component's lifetime
        $963a274682f2cae3$var$registry.register(unmountRef, cleanupRef);
    }
    const returned = (0, $dxdRC$useMemo)(()=>{
        cleanupRef.current && cleanupRef.current();
        cleanupRef.current = null;
        const [returned, cleanup] = callback();
        cleanupRef.current = typeof cleanup === "function" ? cleanup : null;
        return returned;
    }, deps);
    return returned;
}
function $963a274682f2cae3$export$7a9439f340ec21a2(createHeadlessSignal, // @ts-ignore
dependencies = []) {
    const result = $963a274682f2cae3$var$useMemoCleanup(()=>{
        const result = createHeadlessSignal();
        if (result.end || result.dispose) {
            const { end: end, dispose: dispose, ...rest } = result;
            const cleanup = ()=>{
                if (dispose) dispose();
                else if (end) end();
            };
            return [
                rest,
                cleanup
            ];
        }
        return [
            result
        ];
    }, dependencies);
    // @ts-ignore
    return result;
}


var $39cf0b723e8230b3$exports = {};

$parcel$export($39cf0b723e8230b3$exports, "useModalControl", () => $39cf0b723e8230b3$export$cac7fc757a3cbc77);



function $31cbf211212db4a4$export$88238d20aa6c8dd6({ lightDismiss: lightDismiss = false, action: action = "toggle" } = {}) {
    const isOpen = (0, $dxdRC$signal)(false);
    const { ref: controlRef, end: disposeControl } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("click", ()=>{
        if (action === "toggle") isOpen.value = !isOpen.value;
    });
    const { ref: modalRef, end: disposeModal } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("close", ()=>{
        isOpen.value = false;
    });
    const modalEl = (0, $31cbf211212db4a4$import$73969204ac8ec5f9$2983e091f1a1e8e2)(()=>modalRef.current instanceof HTMLDialogElement ? modalRef.current : null);
    (0, $dxdRC$effect)(()=>{
        if (modalEl.value) {
            if (isOpen.value) modalEl.value.showModal();
            else modalEl.value.close();
        }
    });
    return {
        modalRef: /** @type {import('../global.js').Ref<HTMLDialogElement>} */ // @ts-ignore
        modalRef,
        controlRef: /** @type {import('../global.js').Ref<HTMLButtonElement>} */ // @ts-ignore
        controlRef,
        isOpen: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(isOpen),
        dispose: ()=>{
            disposeControl();
            disposeModal();
        }
    };
}



function $39cf0b723e8230b3$export$cac7fc757a3cbc77(options) {
    return (0, $963a274682f2cae3$export$7a9439f340ec21a2)(()=>(0, $31cbf211212db4a4$export$88238d20aa6c8dd6)(options), [
        options?.action,
        options?.lightDismiss
    ]);
}


var $63092c146363d68e$exports = {};

$parcel$export($63092c146363d68e$exports, "useReorderableList", () => $63092c146363d68e$export$4fd830fb61035e6b);


function $63092c146363d68e$export$4fd830fb61035e6b(list = []) {
    return (0, $963a274682f2cae3$export$7a9439f340ec21a2)(()=>(0, $9be4f47e7377fcd6$export$3477e6bdf0907486)(list), [
        list
    ]);
}


$parcel$exportWildcard($5979c6e85e5cd012$exports, $963a274682f2cae3$exports);
$parcel$exportWildcard($5979c6e85e5cd012$exports, $39cf0b723e8230b3$exports);
$parcel$exportWildcard($5979c6e85e5cd012$exports, $63092c146363d68e$exports);


var $d2866cf3dec74024$exports = {};
var $371ae1aee0602620$exports = {};

$parcel$export($371ae1aee0602620$exports, "activeElement", () => $371ae1aee0602620$export$da980962bd2147a4);



function $371ae1aee0602620$export$da980962bd2147a4() {
    /** @type {import('../global.d.ts').Signal<Element | null>} */ const element = (0, $dxdRC$signal)(null);
    const { targetRef: inTargetRef, event: inEvent, end: endIn } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("focusin");
    const { targetRef: outTargetRef, event: outEvent, end: endOut } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("focusout");
    inTargetRef(document.body);
    outTargetRef(document.body);
    const endInEffect = (0, $dxdRC$effect)(()=>{
        if (inEvent.value) element.value = document.activeElement;
    });
    const endOutEffect = (0, $dxdRC$effect)(()=>{
        if (outEvent.value) element.value = document.activeElement;
    });
    return {
        element: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(element),
        end: ()=>{
            endInEffect();
            endOutEffect();
            endIn();
            endOut();
        }
    };
}


var $d79cf8bc85ac70a0$exports = {};

$parcel$export($d79cf8bc85ac70a0$exports, "asyncTask", () => $d79cf8bc85ac70a0$export$e37f1a3c63660c89);


function $d79cf8bc85ac70a0$export$e37f1a3c63660c89(taskFn, getDeps = ()=>{}, { autoRun: autoRun = true } = {}) {
    /** @type {import('../global.d.ts').Signal<Data | null>} */ const data = (0, $dxdRC$signal)(null);
    const isLoading = (0, $dxdRC$signal)(false);
    const deps = (0, $dxdRC$computed)(getDeps);
    const run = async ()=>{
        isLoading.value = true;
        data.value = await taskFn(deps.value);
        isLoading.value = false;
    };
    const end = autoRun ? (0, $dxdRC$effect)(run) : ()=>{};
    return {
        data: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(data),
        isLoading: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(isLoading),
        run: run,
        end: end
    };
}


var $05d79c3404a085c7$exports = {};

$parcel$export($05d79c3404a085c7$exports, "clipboard", () => $05d79c3404a085c7$export$113cec1d2aba8489);


function $05d79c3404a085c7$export$113cec1d2aba8489() {
    const copied = (0, $dxdRC$signal)(false);
    const copy = async (text)=>{
        if (!("clipboard" in navigator)) return false;
        return navigator.clipboard.writeText(text).then(()=>copied.value = true);
    };
    return {
        copied: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(copied),
        copy: copy
    };
}


var $310867d6fcbb7326$exports = {};

$parcel$export($310867d6fcbb7326$exports, "clock", () => $310867d6fcbb7326$export$8c9e255416017e56);

function $310867d6fcbb7326$export$8c9e255416017e56({ interval: interval = 1000 } = {}) {
    const date = (0, $dxdRC$signal)(new Date());
    const intervalId = setInterval(()=>date.value = new Date(), interval);
    return {
        date: date,
        end: ()=>clearInterval(intervalId)
    };
}


var $4f3101b9a0d6a2c5$exports = {};

$parcel$export($4f3101b9a0d6a2c5$exports, "deferred", () => $4f3101b9a0d6a2c5$export$b37aab7cecdd910a);


function $4f3101b9a0d6a2c5$export$b37aab7cecdd910a(promise) {
    /** @type {import('../global.d.ts').Signal<T | null>} */ const value = (0, $dxdRC$signal)(null);
    const isPending = (0, $dxdRC$signal)(true);
    /** @type {import('../global.d.ts').Signal<Error | null>} */ const error = (0, $dxdRC$signal)(null);
    promise.then((v)=>{
        value.value = v;
        isPending.value = false;
    }).catch((e)=>error.value = e);
    return {
        value: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(value),
        isPending: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(isPending),
        error: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(error)
    };
}




var $ba88d93035145985$exports = {};

$parcel$export($ba88d93035145985$exports, "focusManagement", () => $ba88d93035145985$export$61b2bcee224da220);



function $ba88d93035145985$export$61b2bcee224da220() {
    /** @type {import('../global.d.ts').Ref<HTMLOrSVGElement>} */ const targetRef = (0, $18e8e14b82c9968b$export$eff4d24c3ff7876e)();
    const { element: element, end: end } = (0, $371ae1aee0602620$export$da980962bd2147a4)();
    return {
        ref: targetRef,
        isFocused: (0, $dxdRC$computed)(()=>element.value instanceof HTMLElement && targetRef.current === element.value),
        /** @param {FocusOptions} [options] */ focus: (options)=>{
            targetRef.current?.focus(options);
        },
        dispose: end
    };
}


var $0b19bbc991536fce$exports = {};

$parcel$export($0b19bbc991536fce$exports, "focusTrap", () => $0b19bbc991536fce$export$8c303353eaec6a02);




function $0b19bbc991536fce$export$8c303353eaec6a02(trapped) {
    /** @param {Element} element */ function trapFocus(element) {
        /** @type {NodeListOf<HTMLElement>} */ const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];
        const KEYCODE_TAB = 9;
        /**
     * @param {KeyboardEvent} e
     */ const listener = (e)=>{
            const isTabPressed = e.key === "Tab" || e.keyCode === KEYCODE_TAB;
            if (!isTabPressed) return;
            if (e.shiftKey) /* shift + tab */ {
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } else if (document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus();
                e.preventDefault();
            }
        };
        // @ts-ignore
        element.addEventListener("keydown", listener);
        return listener;
    }
    /**
   * @param {EventTarget} element
   * @param {(event: KeyboardEvent) => void} listener
   */ function untrapFocus(element, listener) {
        // @ts-ignore
        element.removeEventListener("keydown", listener);
    }
    const { on: trappedSignal, toggle: toggle } = (0, $0b19bbc991536fce$import$bd65649bfdda4680$d67dea09654f2d07)(Boolean(trapped));
    /** @type {import('../global.d.ts').Ref<Element>} */ const targetRef = (0, $18e8e14b82c9968b$export$eff4d24c3ff7876e)();
    (0, $dxdRC$effect)(()=>{
        if (!trappedSignal.value) return;
        const element = targetRef.current;
        if (element) {
            const listener = trapFocus(element);
            return ()=>untrapFocus(element, listener);
        }
    });
    return {
        trapped: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(trappedSignal),
        ref: targetRef,
        toggle: toggle
    };
}


var $a1b6e24ee0215186$exports = {};

$parcel$export($a1b6e24ee0215186$exports, "keyboardListener", () => $a1b6e24ee0215186$export$dc44f0e8d963cd3c);





function $a1b6e24ee0215186$export$dc44f0e8d963cd3c() {
    /** @type {import('../global.d.ts').Ref<Node>} */ const targetRef = (0, $18e8e14b82c9968b$export$eff4d24c3ff7876e)();
    const { targetRef: kbTargetRef, event: event, end: endListener } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("keyup");
    const { element: activeEl, end: endActive } = (0, $371ae1aee0602620$export$da980962bd2147a4)();
    const isListeningToAll = (0, $dxdRC$computed)(()=>!targetRef.current);
    const isFocusedOnTarget = (0, $dxdRC$computed)(()=>targetRef.current?.contains(activeEl.value) || targetRef.current === activeEl.value);
    const isListening = (0, $dxdRC$computed)(()=>isListeningToAll.value || isFocusedOnTarget.value);
    const end = (0, $dxdRC$effect)(()=>kbTargetRef(isListening.value ? window : undefined));
    return (0, $a1b6e24ee0215186$import$7dcc80e9ee811ae2$9b62055e7f421a1c)({
        ref: targetRef,
        event: event,
        end: ()=>{
            endListener();
            endActive();
            end();
        }
    });
}



var $b7a166374b21d904$exports = {};

$parcel$export($b7a166374b21d904$exports, "mediaQuery", () => $b7a166374b21d904$export$8f880b6e390052fa);


/**
 * @template {{ end: () => void }} T
 * @param {T} obj
 * @returns {T & { dispose: T['end'] }}
 */ function $33c5b6b1dfd8e902$export$9b62055e7f421a1c(obj) {
    return {
        ...obj,
        dispose: obj.end
    };
}


/**
 * @param {any} obj
 * @returns {obj is MediaQueryList}
 */ function $b7a166374b21d904$var$isMqList(obj) {
    return obj && "matches" in obj && "media" in obj;
}
function $b7a166374b21d904$export$8f880b6e390052fa(query) {
    const { targetRef: targetRef, event: event, end: end } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("change");
    targetRef(window.matchMedia(query));
    const mqList = (0, $dxdRC$computed)(()=>$b7a166374b21d904$var$isMqList(targetRef.current) ? targetRef.current : null);
    return (0, $33c5b6b1dfd8e902$export$9b62055e7f421a1c)({
        event: event,
        matches: (0, $dxdRC$computed)(()=>{
            console.log(mqList.value);
            return Boolean(event.value ? event.value?.matches : mqList.value?.matches);
        }),
        end: end,
        dispose: end
    });
}



var $599007d3565e6aff$exports = {};

$parcel$export($599007d3565e6aff$exports, "mutationObserver", () => $599007d3565e6aff$export$dacecbef73d30765);



function $599007d3565e6aff$export$dacecbef73d30765({ options: options, onMutation: onMutation } = {}) {
    /** @type {import('../global.d.ts').Ref<Node>} */ const targetRef = (0, $18e8e14b82c9968b$export$eff4d24c3ff7876e)();
    /** @type {import('../global.d.ts').Signal<MutationRecord[]>} */ const recordsSignal = (0, $dxdRC$signal)([]);
    const observer = new MutationObserver((records, obs)=>{
        recordsSignal.value = records;
        onMutation?.(records, obs);
    });
    const endEffect = (0, $dxdRC$effect)(()=>{
        if (targetRef.current) observer.observe(targetRef.current, options);
        return ()=>observer.disconnect();
    });
    return {
        ref: targetRef,
        records: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(recordsSignal),
        observer: (0, $dxdRC$computed)(()=>observer),
        end: endEffect,
        dispose: endEffect
    };
}


var $1d883743ee44f860$exports = {};

$parcel$export($1d883743ee44f860$exports, "resizeObserver", () => $1d883743ee44f860$export$b13421f1ae71d316);



function $1d883743ee44f860$export$b13421f1ae71d316({ onResize: onResize } = {}) {
    /** @type {import('../global.d.ts').Ref<Element | null>} */ const targetRef = (0, $18e8e14b82c9968b$export$eff4d24c3ff7876e)();
    /** @type {import('../global.d.ts').Signal<ResizeObserverEntry[]>} */ const entries = (0, $dxdRC$signal)([]);
    const entry = (0, $dxdRC$computed)(()=>entries.value.find(({ target: target })=>target === targetRef.current) || null);
    const observer = new ResizeObserver((roEntries, obs)=>{
        entries.value = roEntries;
        onResize?.(roEntries, obs);
    });
    const dispose = (0, $dxdRC$effect)(()=>{
        const el = targetRef.current;
        if (el) {
            observer.observe(el);
            return ()=>observer.unobserve(el);
        }
    });
    return {
        ref: targetRef,
        entry: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(entry),
        dispose: dispose
    };
}



$parcel$exportWildcard($d2866cf3dec74024$exports, $371ae1aee0602620$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $d79cf8bc85ac70a0$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $05d79c3404a085c7$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $310867d6fcbb7326$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $4f3101b9a0d6a2c5$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $d35fc60e7f4dc40d$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $2f63d4d464643d2d$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $ba88d93035145985$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $0b19bbc991536fce$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $a1b6e24ee0215186$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $b7a166374b21d904$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $d87276b39fcdfd94$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $599007d3565e6aff$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $1d883743ee44f860$exports);
$parcel$exportWildcard($d2866cf3dec74024$exports, $5f1a496cb3a2d1ba$exports);



var $5f1a496cb3a2d1ba$exports = {};

$parcel$export($5f1a496cb3a2d1ba$exports, "viewTransition", () => $5f1a496cb3a2d1ba$export$5ddfeb5596fe32a4);
/**
 * @typedef {object} ViewTransition
 * @property {Promise<void>} finished
 * @property {Promise<void>} ready
 * @property {Promise<void>} updateCallbackDone
 * @property {() => void}    skipTransition
 */ /**
 * @template T
 * @param {() => Promise<T> | T} doTransition
 * @param {(vt: ViewTransition) => void} [onTransition]
 */ function $5f1a496cb3a2d1ba$export$5ddfeb5596fe32a4(doTransition, onTransition) {
    if ("startViewTransition" in document) return {
        callback: ()=>{
            // @ts-ignore
            const vt = document.startViewTransition(doTransition);
            onTransition?.(vt);
        }
    };
    return {
        callback: doTransition
    };
}


export {$9be4f47e7377fcd6$export$3477e6bdf0907486 as reorderableList, $5fa1aef9032e25cb$export$a7fa1077ed92634a as showPassword, $9451e01af4218bca$export$c3f9788a1ddcf2d9 as toggleButton, $963a274682f2cae3$export$7a9439f340ec21a2 as useHeadlessSignals, $39cf0b723e8230b3$export$cac7fc757a3cbc77 as useModalControl, $63092c146363d68e$export$4fd830fb61035e6b as useReorderableList, $371ae1aee0602620$export$da980962bd2147a4 as activeElement, $d79cf8bc85ac70a0$export$e37f1a3c63660c89 as asyncTask, $05d79c3404a085c7$export$113cec1d2aba8489 as clipboard, $310867d6fcbb7326$export$8c9e255416017e56 as clock, $4f3101b9a0d6a2c5$export$b37aab7cecdd910a as deferred, $d35fc60e7f4dc40d$export$c746a5152d4ba26c as draggable, $d35fc60e7f4dc40d$export$c4e9c468fa5fa70a as droppable, $2f63d4d464643d2d$export$f5cdf3809b4587f3 as eventListener, $ba88d93035145985$export$61b2bcee224da220 as focusManagement, $0b19bbc991536fce$export$8c303353eaec6a02 as focusTrap, $a1b6e24ee0215186$export$dc44f0e8d963cd3c as keyboardListener, $b7a166374b21d904$export$8f880b6e390052fa as mediaQuery, $d87276b39fcdfd94$export$8b0cb8993e7a9391 as mousedown, $599007d3565e6aff$export$dacecbef73d30765 as mutationObserver, $1d883743ee44f860$export$b13421f1ae71d316 as resizeObserver, $5f1a496cb3a2d1ba$export$5ddfeb5596fe32a4 as viewTransition};
//# sourceMappingURL=index.js.map
