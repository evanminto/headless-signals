import {signal as $iEt1P$signal, effect as $iEt1P$effect, computed as $iEt1P$computed} from "@preact/signals-core";


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
    return (0, $iEt1P$computed)(()=>signal.value);
}



function $18e8e14b82c9968b$export$eff4d24c3ff7876e(initialValue) {
    const refSignal = (0, $iEt1P$signal)(initialValue);
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
    (0, $iEt1P$effect)(()=>{
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
    /** @type {import('../global.d.ts').Signal<import('../global.d.ts').EventType<T> | null>} */ const eventSignal = (0, $iEt1P$signal)(null);
    const end = (0, $iEt1P$effect)(()=>{
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
    const down = (0, $iEt1P$signal)(false);
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
    const dragging = (0, $iEt1P$signal)(false);
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
    const isDraggable = (0, $iEt1P$computed)(()=>!handleRef.current || mouseIsDownOnHandle.value);
    const end = (0, $iEt1P$effect)(()=>{
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
    const dropping = (0, $iEt1P$signal)(false);
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
    const itemsSignal = (0, $iEt1P$signal)(items);
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
   */ const wrappedItemsSignal = (0, $iEt1P$signal)([]);
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
    const end = (0, $iEt1P$effect)(()=>{
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


var $1ea663d0d7bbbda8$exports = {};

$parcel$export($1ea663d0d7bbbda8$exports, "toggleValue", () => $1ea663d0d7bbbda8$export$d67dea09654f2d07);


function $1ea663d0d7bbbda8$export$d67dea09654f2d07(initialOn = false) {
    const on = (0, $iEt1P$signal)(initialOn);
    return {
        on: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(on),
        toggle () {
            on.value = !on.value;
        }
    };
}


function $5fa1aef9032e25cb$export$a7fa1077ed92634a(show = false) {
    const { on: visible, toggle: toggle } = (0, $1ea663d0d7bbbda8$export$d67dea09654f2d07)(show);
    return {
        visible: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(visible),
        inputType: (0, $iEt1P$computed)(()=>visible.value ? "text" : "password"),
        toggle: toggle
    };
}


var $9451e01af4218bca$exports = {};

$parcel$export($9451e01af4218bca$exports, "toggleButton", () => $9451e01af4218bca$export$c3f9788a1ddcf2d9);



function $9451e01af4218bca$export$c3f9788a1ddcf2d9(initialIsToggled = false) {
    const { ref: buttonRef } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("click", ()=>isToggled.value = !isToggled.value);
    const isToggled = (0, $iEt1P$signal)(initialIsToggled);
    const ariaPressed = (0, $iEt1P$computed)(()=>isToggled.value ? "true" : "false");
    const el = (0, $iEt1P$computed)(()=>buttonRef.current instanceof HTMLButtonElement ? buttonRef.current : null);
    const dispose = (0, $iEt1P$effect)(()=>el.value?.setAttribute("aria-pressed", ariaPressed.value));
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


export {$9be4f47e7377fcd6$export$3477e6bdf0907486 as reorderableList, $5fa1aef9032e25cb$export$a7fa1077ed92634a as showPassword, $9451e01af4218bca$export$c3f9788a1ddcf2d9 as toggleButton};
//# sourceMappingURL=components.js.map
