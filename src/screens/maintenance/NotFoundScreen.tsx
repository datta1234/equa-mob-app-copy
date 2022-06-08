import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

import { images } from 'assets';
import { Title, Text } from 'components/Typography';
import { scale, scaleHeight, SCREEN_WIDTH } from 'constants/layout';
import { BaseStackNavigationProp, BaseStackRouteProp } from 'types/navigation';

import MaintenanceContainer from './MaintenanceContainer';

type Props = {
  route: BaseStackRouteProp<'NotFoundScreen'>;
  navigation: BaseStackNavigationProp<'NotFoundScreen'>;
};

function NotFoundScreen({}: Props) {
  const logo = images.LOGO_DARK_TAP;

  return (
    <MaintenanceContainer>
      <Image source={logo} style={s.logo} resizeMode="contain" />
      <View style={s.spacing} />
      <Title style={s.title} color={'primary'} fontSize={'h3'}>
        Sorry, we were unable to find that route
      </Title>
      <View style={s.spacing} />
      <Text center fontSize={'h5'} color={'light'}>
        Please navigate back
      </Text>
    </MaintenanceContainer>
  );
}

export default NotFoundScreen;

const s = StyleSheet.create({
  logo: {
    marginTop: scaleHeight(25),
    width: scale(100),
  },
  spacing: {
    height: scaleHeight(40),
  },
  title: {
    maxWidth: SCREEN_WIDTH * 0.6,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    minWidth: scale(130),
    marginTop: scaleHeight(15),
  },
});
