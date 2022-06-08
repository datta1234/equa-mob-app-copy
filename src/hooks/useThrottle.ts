import { useCallback } from 'react';

import { throttle } from 'lodash';

export default function useThrottle(callback, delay, options) {
  const throttledFn = useCallback(
    throttle((...args) => callback(...args), delay, {
      trailing: false,
      ...options,
    }),
    [delay, options] // will recreate if delay changes
  );
  return throttledFn;
}
