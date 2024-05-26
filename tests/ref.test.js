import { describe, it, expect } from 'vitest';
import { ref, forwardedRef } from '../src/ref.js';

describe('ref', () => {
  it('sets .current', () => {
    const myObj = {};
    const myRef = ref();
    myRef(myObj);
    expect(myRef.current).toBe(myObj);
  });
});

describe('forwardedRef', () => {
  it('sets .current', () => {
    const myObj = {};
    const myRef1 = ref();
    const myRef2 = ref();
    const myForwardedRef = forwardedRef([myRef1, myRef2]);
    myForwardedRef(myObj);
    expect(myForwardedRef.current).toBe(myObj);
    expect(myRef1.current).toBe(myObj);
    expect(myRef2.current).toBe(myObj);
  });
});
