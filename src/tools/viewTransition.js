/**
 * @typedef {object} ViewTransition
 * @property {Promise<void>} finished
 * @property {Promise<void>} ready
 * @property {Promise<void>} updateCallbackDone
 * @property {() => void}    skipTransition
 */

/**
 * @template T
 * @param {() => Promise<T> | T} doTransition
 * @param {(vt: ViewTransition) => void} [onTransition]
 */
export function viewTransition(doTransition, onTransition) {
  if ('startViewTransition' in document) {
    return {
      callback: () => {
        // @ts-ignore
        const vt = document.startViewTransition(doTransition);
        onTransition?.(vt);
      },
    }
  }

  return { callback: doTransition };
}
