import { Animated } from 'react-native';

import { MODAL_CONFIG } from '../../config';

const { multiply } = Animated;

export const lightVerticalModalsInterpolate = ({
  current,
  inverted,
  layouts: { screen },
  ...rest
}) => {
  const translateY = multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.height, 0],
      extrapolate: 'clamp',
    }),
    inverted
  );

  const opacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-0.25, 0.15],
    extrapolate: 'clamp',
  });

  return {
    overlayStyle: {
      opacity,
    },
    cardStyle: {
      transform: [{ translateY }],
    },
  };
};

export const DISABLED_MODAL_CONFIG = {
  ...MODAL_CONFIG,
  cardStyleInterpolator: lightVerticalModalsInterpolate,
};
