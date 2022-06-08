import React from 'react';

// import { HeaderStyleInterpolators } from '@react-navigation/stack';
import { View } from 'react-native';
import { Platform, Dimensions } from 'react-native';

import { Typography, BackButton } from 'components';

const isLandscape = () => {
  const dim = Dimensions.get('screen');
  return dim.width >= dim.height;
};
function tabBarHeight() {
  const majorVersion = parseInt(Platform.Version, 10);
  const isIos = Platform.OS === 'ios';
  const isIOS11 = majorVersion >= 11 && isIos;
  if (Platform.isPad) {
    return 49;
  }
  if (isIOS11 && !isLandscape()) {
    return 49;
  }
  return 29;
}

export const QR_CODE_CONFIG = {
  cardStyle: { backgroundColor: 'transparent' },
  headerTransparent: true,
  headerStyle: { height: tabBarHeight() + 35 },
  headerForceInset: { top: 10, bottom: 'never' },
  headerTitle: () => (
    <View>
      <Typography.Title mode="dark" level={3}>
        Scan QR Code
      </Typography.Title>
    </View>
  ),
  headerLeft: (props) => <BackButton {...props} mode="dark" />,
  headerRight: null,
};

export const MANUAL_INPUT_FORM_CONFIG = {
  headerTitle: () => (
    <Typography.Title level={3}>Manual Input</Typography.Title>
  ),
  headerLeft: (props) => <BackButton {...props} />,
  headerStyle: {
    height: tabBarHeight() + 35,
    borderWidth: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  gestureEnabled: false,
  headerRight: null,
};
