import { useCallback, useEffect, useRef } from 'react';
import useUpdateEffect from './useUpdateEffect';

export default function useTimeout(
  callback,
  delay,
  options = { runOnMount: false }
) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef(); //timeoutRef just allows us to clear the timeout when needed

  // Set callbackRef to callback onMount and whenever change
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  // run onMount
  useEffect(() => {
    if (options.runOnMount) {
      set();
    }
  }, []);

  useUpdateEffect(set, [delay, set, clear], clear);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { set, reset, clear };
}
