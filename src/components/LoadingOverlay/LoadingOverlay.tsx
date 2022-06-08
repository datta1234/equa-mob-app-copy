import React from 'react';

import { rgba } from 'polished';
// import { View } from 'native-base';
import { View, StyleSheet } from 'react-native';
import {
  BarIndicator,
  BallIndicator,
  DotIndicator,
  MaterialIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
  PacmanIndicator,
} from 'react-native-indicators';

import colors from 'constants/colors';

// type Props = {
//   visible?: boolean,
//   size?: number
//   containerStyle?: Object,
// };

function switchIndicator(type) {
  switch (type) {
    case 'bar':
      return BarIndicator;
    case 'ball':
      return BallIndicator;
    case 'dot':
      return DotIndicator;
    case 'pulse':
      return PulseIndicator;
    case 'pac':
      return PacmanIndicator;
    case 'material':
      return MaterialIndicator;
    case 'ios':
      return UIActivityIndicator;
    case 'skype':
      return SkypeIndicator;
    case 'wave':
      return WaveIndicator;

    default:
      return MaterialIndicator;
  }
}

const LoadingOverlay = ({
  type,
  color,
  containerStyle,
  visible,
  size,
  ...rest
}) =>
  // : Props
  {
    if (!visible) {
      return null;
    }

    const Indicator = switchIndicator(type);

    return (
      <View style={[s.container, containerStyle]}>
        <Indicator
          size={size}
          color={colors.indicator[color ?? 'primary']}
          {...rest}
        />
      </View>
    );
  };

LoadingOverlay.defaultProps = {
  visible: true,
  size: 60,
};

export default React.memo(LoadingOverlay);

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: rgba(colors.WHITE, 0.4),
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
});
