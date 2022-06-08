import { useEffect, useRef } from 'react';

/**
 *  useEffect without running on mount
 * @param callback function to run on change of dependencies
 * @param dependencies — If present, effect will only activate if the values in the list change.
 * @param cleanup — If present, function to run cleanup
 */
export default function useUpdateEffect(callback, dependencies, cleanup) {
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      callback();
    }
    return cleanup;
  }, dependencies);
}
