import React from 'react';

import { rgba } from 'polished';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';

const LoaderOverlay = ({ visible, size, ...rest }) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={s.overlay}>
      <ActivityIndicator size={size} {...rest} />
    </View>
  );
};

const s = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: rgba('#fff', 0.25),
  },
});

LoaderOverlay.defaultProps = {
  visible: true,
  size: 'small',
};

export default LoaderOverlay;
