import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { images } from 'assets';
import { scaleHeight } from 'constants/layout';

const poweredBy = {
  light: images.POWERED_BY_LOGO_LIGHT,
  dark: images.POWERED_BY_LOGO_DARK,
};
const PoweredBy = ({ dark }) => {
  return (
    <View style={s.container}>
      <Image source={poweredBy[dark ? 'dark' : 'light']} />
    </View>
  );
};

export default PoweredBy;

const s = StyleSheet.create({
  container: {
    paddingTop: scaleHeight(20),
    paddingBottom: scaleHeight(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
