import { StackNavigationOptions } from '@react-navigation/stack';
import { Animated } from 'react-native';

const { multiply } = Animated;

export const verticalModalsInterpolate = ({
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
    inverted,
  );

  const opacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-0.25, 0.6],
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

export const MODAL_CONFIG: StackNavigationOptions = {
  cardStyle: { backgroundColor: 'transparent' },
  gestureResponseDistance: { vertical: 850 },
  cardOverlayEnabled: true,
  cardStyleInterpolator: verticalModalsInterpolate,
};

// Fade in modal animation
export const modalScreenOptions: StackNavigationOptions = {
  cardOverlayEnabled: true,
  cardStyle: { backgroundColor: 'transparent', opacity: 1 },
  cardStyleInterpolator: ({ current: { progress } }) => ({
    cardStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
    },
    overlayStyle: {
      opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
        extrapolate: 'clamp',
      }),
    },
  }),
};
