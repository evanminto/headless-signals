import { h, render } from 'preact';
import { useComputed, useSignal } from '@preact/signals';
import htm from 'htm';
import { toggleButton, showPassword } from '../../dist/components/components.js';
import {
  resizeObserver,
  clipboard,
  focusTrap,
  draggable,
  droppable,
  keyboardListener,
  mediaQuery,
  viewTransition
} from '../../dist/tools/tools.js';
import {
  useHeadlessSignals,
  useModalControl,
  useReorderableList
} from '../../dist/preact/preact.js';

const html = htm.bind(h);

function Button({ toggled = false }) {
  const { ref, isToggled } = useHeadlessSignals(() => toggleButton(toggled), [toggled]);

  return html`
    <button ref=${ref}>
      Toggle Me (${useComputed(() => isToggled.value ? 'On' : 'Off')})
    </button>
  `;
}

function Textarea() {
  const { entry, ref } = useHeadlessSignals(() => resizeObserver());

  const sizesStr = useComputed(
    () => {
      const { blockSize = 0, inlineSize = 0 } = (
        entry.value?.borderBoxSize?.[0] || {}
      );

      const blockSizeRound = Math.round(blockSize);
      const inlineSizeRound = Math.round(inlineSize);

      return `${inlineSizeRound}x${blockSizeRound}`;
    }
  );

  return html`
    <textarea ref=${ref}></textarea>
    <span>${sizesStr}</span>
  `;
}

function CopyableText({ value }) {
  const { copy, copied } = useHeadlessSignals(() => clipboard());

  return html`
    <input type="text" value=${value} readonly />

    <button onClick=${() => copy(value)}>
      ${useComputed(() => copied.value ? 'Copied!' : 'Copy')}
    </button>
  `;
}

function Password() {
  const { visible, inputType, toggle } = useHeadlessSignals(() => showPassword());

  return html`
    <input type=${inputType} />
    <button onClick=${toggle}>
      ${useComputed(() => visible.value ? 'Hide' : 'Show')}
    </button>
  `;
}

function FocusTrapped() {
  const { ref, trapped, toggle } = useHeadlessSignals(() => focusTrap());
  
  return html`
    <div ref=${ref}>
      <div><a href="">Foo bar</a></div>
      <div><a href="">Baz</a></div>
      <button onClick=${toggle}>
        ${useComputed(() => trapped.value ? 'Untrap' : 'Trap')}
      </button>
    </div>
  `;
}

function DragAndDrop() {
  const { ref: draggableRef } = useHeadlessSignals(() => draggable());
  const { ref: droppableRef } = useHeadlessSignals(
    () => droppable({ onDrop: () => (inDropzone.value = true) })
  );
  const inDropzone = useSignal(false);
  const draggableEl = html`
    <div ref=${draggableRef} style="background-color: black; color: white;">
      Draggable
    </div>
  `;

  return html`
    ${!inDropzone.value && draggableEl}

    <div ref=${droppableRef} style="border: 1px solid black; padding: 5px;">
      Dropzone
      ${inDropzone.value && draggableEl}
    </div>
  `;
}

/**
 * @template {string} T
 * @param {object} params
 * @param {T[]} params.items 
 * @param {(item: T) => any} [params.renderItem]
 */
function ReorderableList({ items = [], renderItem = (item) => item }) {
  const { items: itemsSignal } = useReorderableList(items);
  
  return html`
    <ol>
      ${itemsSignal.value.map(({
        item,
        dragging,
        dropping,
        ref,
        handleRef,
        moveUp,
        moveDown,
        moveToTop
      }) => html`
        <li
          ref=${ref}
          style=${`position: relative; cursor: move; ${dragging.value && 'opacity: 0.5;'}`}
          key=${item}
          data-value=${item}
        >
          <div
            hidden=${dragging.value || !dropping.value}
            style="position: absolute; left: -35px; top: 0;"
          >►</div>

          <span ref=${handleRef} style="cursor: move">≡</span>
          ${renderItem(item)}
          <button onClick=${moveUp}>Up</button>
          <button onClick=${moveDown}>Down</button>
          <button onClick=${moveToTop}>Top</button>
        </li>
      `)}
    </ol>
  `;
}

function Keylogger() {
  const { ref, event } = useHeadlessSignals(() => keyboardListener());

  return html`
    <input ref=${ref} />
    <output>${useComputed(() => event.value?.key || '')}</output>
  `;
}

function MediaQuery() {
  const { matches } = useHeadlessSignals(() => mediaQuery('(width > 600px)'));

  return html`
    ${useComputed(() => matches.value ? '> 600px' : '<= 600px')}
  `;
}

function ModalControl() {
  const { controlRef, modalRef } = useModalControl();

  return html`
    <button ref=${controlRef} type="button">Open</button>
    <dialog ref=${modalRef}>Modal</dialog>
  `;
}

function ViewTransition() {
  const isRed = useSignal(false);
  const { callback: onClick } = useHeadlessSignals(() => viewTransition(() => {
    isRed.value = !isRed.value;
  }));

  return html`
    <div style="background: ${isRed.value ? 'red' : 'black'}; color: white;" onClick=${onClick}>
      Turn ${isRed.value ? 'Black' : 'Red'}
    </div>
  `;
}

const root = document.querySelector('#preact');

if (root) {
  render(
    html`
      <div>
        <${Button} />
      </div>
      <div>
        <${Textarea} />
      </div>
      <div>
        <${CopyableText} value="asdf" />
      </div>
      <div>
        <${Password} />
      </div>
      <div>
        <${FocusTrapped} />
      </div>
      <div>
        <${ReorderableList} items=${['foo', 'bar', 'lorem', 'ipsum', 'dolor']} />
      </div>
      <div>
        <${DragAndDrop} />
      </div>
      <div>
        <${Keylogger} />
      </div>
      <div>
        <${MediaQuery} />
      </div>
      <div>
        <${ModalControl} />
      </div>
      <div>
        <${ViewTransition} />
      </div>
    `,
    root
  );
}
