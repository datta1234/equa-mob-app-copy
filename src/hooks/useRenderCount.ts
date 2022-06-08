import { useEffect, useRef } from 'react';

/**    useRenderCount
 *  counts the number of times a screen renders / rerenders
 *  Use to performance optimize your components
 *  returns the render count.
 */

export default function useRenderCount() {
  const count = useRef(1);
  useEffect(() => {
    count.current++;
  });
  return count.current;
}
