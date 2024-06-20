import { computed, effect } from '@preact/signals-core';
import { createRef } from '../ref.js';

/**
 * @template {Element} T
 * @typedef {{ [P in keyof T]: () => T[P] }} PropsMap<T>
 */

/** @typedef {Record<string, () => string>} AttrsMap */

/**
 * @template {Element} T
 * @typedef {PropsMap<T> & { attrs: AttrsMap }} ApplyPropsOptions<T>
 */

/**
 * @template {Element} T
 * @param {ApplyPropsOptions<T>} props
 */
export function applyProps(props) {
  /** @type {ReturnType<typeof createRef<T>>} */
  const ref = createRef(null);
  const { attrs = {}, ...nonAttrProps } = props;

  const propComputeds = Object.keys(nonAttrProps).reduce(
    (map, key) => map.set(key, computed(nonAttrProps[key])),
    /** @type {Map<string, ReturnType<typeof computed<any>>} */
    (new Map()),
  );

  const attrComputeds = Object.keys(attrs).reduce(
    (map, key) => map.set(key, computed(attrs[key])),
    /** @type {Map<string, ReturnType<typeof computed<string | undefined>>>} */
    (new Map()),
  );

  const propDisposes = Array.from(propComputeds.entries()).map(
    ([key, signal]) =>
      effect(() => {
        if (!ref.current) {
          return;
        }

        ref.current[key] = signal.value;
      }),
  );

  const attrDisposes = Array.from(attrComputeds.entries()).map(
    ([key, signal]) =>
      effect(() => {
        if (!ref.current) {
          return;
        }

        if (signal.value === undefined) {
          ref.current.removeAttribute(key);
        } else {
          ref.current.setAttribute(key, signal.value);
        }
      }),
  );

  return {
    ref,
    dispose: () => {
      propDisposes.forEach((dispose) => dispose());
      attrDisposes.forEach((dispose) => dispose());
    },
  };
}
