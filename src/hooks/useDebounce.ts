import { useCallback } from 'react';

import { debounce } from 'lodash';

export default function useDebounce(callback, delay, options) {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay, options),
    [delay, options] // will recreate if delay changes
  );
  return debouncedFn;
}
