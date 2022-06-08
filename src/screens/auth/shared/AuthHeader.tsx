import React from 'react';

import { images } from 'assets';
import { Image, StyleSheet, View } from 'react-native';

import Header from 'components/Header';
import { scaleHeight } from 'constants/layout';

const logo = {
  light: images.LOGO_LIGHT_TAP,
  dark: images.LOGO_DARK_TAP,
};
const AuthHeader = ({ title, dark }) => {
  return (
    <View style={s.headerContainer}>
      {title && <Header.Title style={s.title}>{title}</Header.Title>}
      <Image source={logo[dark ? 'dark' : 'light']} />
    </View>
  );
};

export default AuthHeader;

const s = StyleSheet.create({
  headerContainer: {
    paddingTop: scaleHeight(12),
    paddingBottom: scaleHeight(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: scaleHeight(12),
  },
});
