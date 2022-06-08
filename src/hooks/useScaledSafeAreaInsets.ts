import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { scale, scaleHeight } from 'constants/layout';

function useScaledSafeAreaInsets(extraInset) {
  const insets = useSafeAreaInsets();

  const top = (insets.top || 10) + scaleHeight(extraInset?.top);
  const left = insets.left + scale(extraInset?.left);
  const right = insets.right + scale(extraInset?.right);
  const bottom = (insets.bottom || 18) + scaleHeight(extraInset?.bottom);

  return { top, left, right, bottom };
}

export default useScaledSafeAreaInsets;
