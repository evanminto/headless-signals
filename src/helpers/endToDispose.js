/**
 * @template {{ end: () => void }} T
 * @param {T} obj
 * @returns {T & { dispose: T['end'] }}
 */
export function endToDispose(obj) {
  return { ...obj, dispose: obj.end };
}
