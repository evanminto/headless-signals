/**
 * @template T
 */
export default function createPromiseWithResolvers() {
  /** @type {(value: T | PromiseLike<T>) => void} */
  let resolve;
  /** @type {(reason?: any) => void} */
  let reject;

  /** @type {Promise<T>} */
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve,
    reject,
  };
}
