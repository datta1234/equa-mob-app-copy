import { useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const savedCallback = useRef();
  const intervalRef = useRef(); //intervalRef just allows us to clear the timeout when needed

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      intervalRef.current = setInterval(tick, delay);
      return () => clearInterval(intervalRef.current);
    }
  }, [delay]);

  return [clearInterval(intervalRef.current)];
}
