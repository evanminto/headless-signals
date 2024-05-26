import {useRef as $ec4qp$useRef, useMemo as $ec4qp$useMemo} from "preact/hooks";
import {signal as $ec4qp$signal, computed as $ec4qp$computed, effect as $ec4qp$effect} from "@preact/signals-core";


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
    /** @type {import('preact/hooks').MutableRef<(() => void) | null>} */ const cleanupRef = (0, $ec4qp$useRef)(null); // holds a cleanup value
    const unmountRef = (0, $ec4qp$useRef)(false); // the GC-triggering candidate
    if (!unmountRef.current) {
        unmountRef.current = true;
        // this works since refs are preserved for the component's lifetime
        $963a274682f2cae3$var$registry.register(unmountRef, cleanupRef);
    }
    const returned = (0, $ec4qp$useMemo)(()=>{
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

var $2f63d4d464643d2d$exports = {};

$parcel$export($2f63d4d464643d2d$exports, "eventListener", () => $2f63d4d464643d2d$export$f5cdf3809b4587f3);


function $18e8e14b82c9968b$export$eff4d24c3ff7876e(initialValue) {
    const refSignal = (0, $ec4qp$signal)(initialValue);
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
    (0, $ec4qp$effect)(()=>{
        refs.forEach((ref)=>ref(newRef.current));
    });
    return newRef;
}



function $0bc857c25723e53f$export$6ec456bd5b7b3c51(signal) {
    return (0, $ec4qp$computed)(()=>signal.value);
}


function $2f63d4d464643d2d$export$f5cdf3809b4587f3(eventName, callback) {
    /** @type {import('../global.d.ts').Ref<Target>} */ const targetRef = (0, $18e8e14b82c9968b$export$eff4d24c3ff7876e)();
    /** @type {import('../global.d.ts').Signal<import('../global.d.ts').EventType<T> | null>} */ const eventSignal = (0, $ec4qp$signal)(null);
    const end = (0, $ec4qp$effect)(()=>{
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



function $31cbf211212db4a4$export$88238d20aa6c8dd6({ lightDismiss: lightDismiss = false, action: action = "toggle" } = {}) {
    const isOpen = (0, $ec4qp$signal)(false);
    const { ref: controlRef, end: disposeControl } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("click", ()=>{
        if (action === "toggle") isOpen.value = !isOpen.value;
    });
    const { ref: modalRef, end: disposeModal } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("close", ()=>{
        isOpen.value = false;
    });
    const modalEl = (0, $ec4qp$computed)(()=>modalRef.current instanceof HTMLDialogElement ? modalRef.current : null);
    (0, $ec4qp$effect)(()=>{
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
var $9be4f47e7377fcd6$exports = {};

$parcel$export($9be4f47e7377fcd6$exports, "reorderableList", () => $9be4f47e7377fcd6$export$3477e6bdf0907486);



var $d35fc60e7f4dc40d$exports = {};

$parcel$export($d35fc60e7f4dc40d$exports, "draggable", () => $d35fc60e7f4dc40d$export$c746a5152d4ba26c);
$parcel$export($d35fc60e7f4dc40d$exports, "droppable", () => $d35fc60e7f4dc40d$export$c4e9c468fa5fa70a);




var $d87276b39fcdfd94$exports = {};

$parcel$export($d87276b39fcdfd94$exports, "mousedown", () => $d87276b39fcdfd94$export$8b0cb8993e7a9391);




function $d87276b39fcdfd94$export$8b0cb8993e7a9391() {
    const down = (0, $ec4qp$signal)(false);
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
    const dragging = (0, $ec4qp$signal)(false);
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
    const isDraggable = (0, $ec4qp$computed)(()=>!handleRef.current || mouseIsDownOnHandle.value);
    const end = (0, $ec4qp$effect)(()=>{
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
    const dropping = (0, $ec4qp$signal)(false);
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
    const itemsSignal = (0, $ec4qp$signal)(items);
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
   */ const wrappedItemsSignal = (0, $ec4qp$signal)([]);
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
    const end = (0, $ec4qp$effect)(()=>{
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



function $63092c146363d68e$export$4fd830fb61035e6b(list = []) {
    return (0, $963a274682f2cae3$export$7a9439f340ec21a2)(()=>(0, $9be4f47e7377fcd6$export$3477e6bdf0907486)(list), [
        list
    ]);
}


$parcel$exportWildcard($5979c6e85e5cd012$exports, $963a274682f2cae3$exports);
$parcel$exportWildcard($5979c6e85e5cd012$exports, $39cf0b723e8230b3$exports);
$parcel$exportWildcard($5979c6e85e5cd012$exports, $63092c146363d68e$exports);


export {$963a274682f2cae3$export$7a9439f340ec21a2 as useHeadlessSignals, $39cf0b723e8230b3$export$cac7fc757a3cbc77 as useModalControl, $63092c146363d68e$export$4fd830fb61035e6b as useReorderableList};
//# sourceMappingURL=preact.js.map
