import {signal as $uGLsK$signal, effect as $uGLsK$effect, computed as $uGLsK$computed} from "@preact/signals-core";


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
var $d2866cf3dec74024$exports = {};
var $371ae1aee0602620$exports = {};

$parcel$export($371ae1aee0602620$exports, "activeElement", () => $371ae1aee0602620$export$da980962bd2147a4);


function $0bc857c25723e53f$export$6ec456bd5b7b3c51(signal) {
    return (0, $uGLsK$computed)(()=>signal.value);
}


var $2f63d4d464643d2d$exports = {};

$parcel$export($2f63d4d464643d2d$exports, "eventListener", () => $2f63d4d464643d2d$export$f5cdf3809b4587f3);


function $18e8e14b82c9968b$export$eff4d24c3ff7876e(initialValue) {
    const refSignal = (0, $uGLsK$signal)(initialValue);
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
    (0, $uGLsK$effect)(()=>{
        refs.forEach((ref)=>ref(newRef.current));
    });
    return newRef;
}



function $2f63d4d464643d2d$export$f5cdf3809b4587f3(eventName, callback) {
    /** @type {import('../global.d.ts').Ref<Target>} */ const targetRef = (0, $18e8e14b82c9968b$export$eff4d24c3ff7876e)();
    /** @type {import('../global.d.ts').Signal<import('../global.d.ts').EventType<T> | null>} */ const eventSignal = (0, $uGLsK$signal)(null);
    const end = (0, $uGLsK$effect)(()=>{
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


function $371ae1aee0602620$export$da980962bd2147a4() {
    /** @type {import('../global.d.ts').Signal<Element | null>} */ const element = (0, $uGLsK$signal)(null);
    const { targetRef: inTargetRef, event: inEvent, end: endIn } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("focusin");
    const { targetRef: outTargetRef, event: outEvent, end: endOut } = (0, $2f63d4d464643d2d$export$f5cdf3809b4587f3)("focusout");
    inTargetRef(document.body);
    outTargetRef(document.body);
    const endInEffect = (0, $uGLsK$effect)(()=>{
        if (inEvent.value) element.value = document.activeElement;
    });
    const endOutEffect = (0, $uGLsK$effect)(()=>{
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
    /** @type {import('../global.d.ts').Signal<Data | null>} */ const data = (0, $uGLsK$signal)(null);
    const isLoading = (0, $uGLsK$signal)(false);
    const deps = (0, $uGLsK$computed)(getDeps);
    const run = async ()=>{
        isLoading.value = true;
        data.value = await taskFn(deps.value);
        isLoading.value = false;
    };
    const end = autoRun ? (0, $uGLsK$effect)(run) : ()=>{};
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
    const copied = (0, $uGLsK$signal)(false);
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
    const date = (0, $uGLsK$signal)(new Date());
    const intervalId = setInterval(()=>date.value = new Date(), interval);
    return {
        date: date,
        end: ()=>clearInterval(intervalId)
    };
}


var $4f3101b9a0d6a2c5$exports = {};

$parcel$export($4f3101b9a0d6a2c5$exports, "deferred", () => $4f3101b9a0d6a2c5$export$b37aab7cecdd910a);


function $4f3101b9a0d6a2c5$export$b37aab7cecdd910a(promise) {
    /** @type {import('../global.d.ts').Signal<T | null>} */ const value = (0, $uGLsK$signal)(null);
    const isPending = (0, $uGLsK$signal)(true);
    /** @type {import('../global.d.ts').Signal<Error | null>} */ const error = (0, $uGLsK$signal)(null);
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


var $d35fc60e7f4dc40d$exports = {};

$parcel$export($d35fc60e7f4dc40d$exports, "draggable", () => $d35fc60e7f4dc40d$export$c746a5152d4ba26c);
$parcel$export($d35fc60e7f4dc40d$exports, "droppable", () => $d35fc60e7f4dc40d$export$c4e9c468fa5fa70a);




var $d87276b39fcdfd94$exports = {};

$parcel$export($d87276b39fcdfd94$exports, "mousedown", () => $d87276b39fcdfd94$export$8b0cb8993e7a9391);




function $d87276b39fcdfd94$export$8b0cb8993e7a9391() {
    const down = (0, $uGLsK$signal)(false);
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
    const dragging = (0, $uGLsK$signal)(false);
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
    const isDraggable = (0, $uGLsK$computed)(()=>!handleRef.current || mouseIsDownOnHandle.value);
    const end = (0, $uGLsK$effect)(()=>{
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
    const dropping = (0, $uGLsK$signal)(false);
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



var $ba88d93035145985$exports = {};

$parcel$export($ba88d93035145985$exports, "focusManagement", () => $ba88d93035145985$export$61b2bcee224da220);



function $ba88d93035145985$export$61b2bcee224da220() {
    /** @type {import('../global.d.ts').Ref<HTMLOrSVGElement>} */ const targetRef = (0, $18e8e14b82c9968b$export$eff4d24c3ff7876e)();
    const { element: element, end: end } = (0, $371ae1aee0602620$export$da980962bd2147a4)();
    return {
        ref: targetRef,
        isFocused: (0, $uGLsK$computed)(()=>element.value instanceof HTMLElement && targetRef.current === element.value),
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
    (0, $uGLsK$effect)(()=>{
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
    const isListeningToAll = (0, $uGLsK$computed)(()=>!targetRef.current);
    const isFocusedOnTarget = (0, $uGLsK$computed)(()=>targetRef.current?.contains(activeEl.value) || targetRef.current === activeEl.value);
    const isListening = (0, $uGLsK$computed)(()=>isListeningToAll.value || isFocusedOnTarget.value);
    const end = (0, $uGLsK$effect)(()=>kbTargetRef(isListening.value ? window : undefined));
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
    const mqList = (0, $uGLsK$computed)(()=>$b7a166374b21d904$var$isMqList(targetRef.current) ? targetRef.current : null);
    return (0, $33c5b6b1dfd8e902$export$9b62055e7f421a1c)({
        event: event,
        matches: (0, $uGLsK$computed)(()=>{
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
    /** @type {import('../global.d.ts').Signal<MutationRecord[]>} */ const recordsSignal = (0, $uGLsK$signal)([]);
    const observer = new MutationObserver((records, obs)=>{
        recordsSignal.value = records;
        onMutation?.(records, obs);
    });
    const endEffect = (0, $uGLsK$effect)(()=>{
        if (targetRef.current) observer.observe(targetRef.current, options);
        return ()=>observer.disconnect();
    });
    return {
        ref: targetRef,
        records: (0, $0bc857c25723e53f$export$6ec456bd5b7b3c51)(recordsSignal),
        observer: (0, $uGLsK$computed)(()=>observer),
        end: endEffect,
        dispose: endEffect
    };
}


var $1d883743ee44f860$exports = {};

$parcel$export($1d883743ee44f860$exports, "resizeObserver", () => $1d883743ee44f860$export$b13421f1ae71d316);



function $1d883743ee44f860$export$b13421f1ae71d316({ onResize: onResize } = {}) {
    /** @type {import('../global.d.ts').Ref<Element | null>} */ const targetRef = (0, $18e8e14b82c9968b$export$eff4d24c3ff7876e)();
    /** @type {import('../global.d.ts').Signal<ResizeObserverEntry[]>} */ const entries = (0, $uGLsK$signal)([]);
    const entry = (0, $uGLsK$computed)(()=>entries.value.find(({ target: target })=>target === targetRef.current) || null);
    const observer = new ResizeObserver((roEntries, obs)=>{
        entries.value = roEntries;
        onResize?.(roEntries, obs);
    });
    const dispose = (0, $uGLsK$effect)(()=>{
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


export {$371ae1aee0602620$export$da980962bd2147a4 as activeElement, $d79cf8bc85ac70a0$export$e37f1a3c63660c89 as asyncTask, $05d79c3404a085c7$export$113cec1d2aba8489 as clipboard, $310867d6fcbb7326$export$8c9e255416017e56 as clock, $4f3101b9a0d6a2c5$export$b37aab7cecdd910a as deferred, $d35fc60e7f4dc40d$export$c746a5152d4ba26c as draggable, $d35fc60e7f4dc40d$export$c4e9c468fa5fa70a as droppable, $2f63d4d464643d2d$export$f5cdf3809b4587f3 as eventListener, $ba88d93035145985$export$61b2bcee224da220 as focusManagement, $0b19bbc991536fce$export$8c303353eaec6a02 as focusTrap, $a1b6e24ee0215186$export$dc44f0e8d963cd3c as keyboardListener, $b7a166374b21d904$export$8f880b6e390052fa as mediaQuery, $d87276b39fcdfd94$export$8b0cb8993e7a9391 as mousedown, $599007d3565e6aff$export$dacecbef73d30765 as mutationObserver, $1d883743ee44f860$export$b13421f1ae71d316 as resizeObserver, $5f1a496cb3a2d1ba$export$5ddfeb5596fe32a4 as viewTransition};
//# sourceMappingURL=tools.js.map
