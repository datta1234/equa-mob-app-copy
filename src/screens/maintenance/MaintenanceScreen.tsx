import React, { useState, useEffect, useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { Image, StyleSheet, View } from 'react-native';

import { images } from 'assets';

import { Title, Text } from 'components/Typography';
import { scale, scaleHeight, SCREEN_WIDTH } from 'constants/layout';
import { navigationRef } from 'navigation/RootNavigation';
import remoteConfigUtils from 'utils/remoteConfig';

import MaintenanceContainer from './MaintenanceContainer';
import { AUTH_NAVIGATOR } from 'constants/routes';
import useInterval from 'hooks/useInterval';

const CHECK_STATUS_DELAY = 120000; // 2min

export default function MaintenanceScreen() {
  const logo = images.LOGO_DARK_TAP;

  const [status, setStatus] = useState('inactive');
  const { getUnderMaintenance } = remoteConfigUtils;

  useEffect(() => {
    if (status === 'active') {
      navigationRef.current.reset({
        index: 0,
        routes: [{ name: AUTH_NAVIGATOR.NAME }],
      });
    }
  }, [status]);

  useInterval(async () => {
    const underMaintenance = await getUnderMaintenance();
    const isServerHealthy = true; //await isServerUp();

    // disable maintenance screen only if server is ready AND we're not under maintenance
    if (isServerHealthy && !underMaintenance) {
      setStatus('active');
    }
  }, CHECK_STATUS_DELAY);

  return (
    <MaintenanceContainer>
      <Image source={logo} style={s.logo} resizeMode="contain" />
      <View style={s.spacing} />
      <Title style={s.title} color={'primary'} fontSize={'h3'}>
        Sorry, our servers are down for maintenance
      </Title>
      <View style={s.spacing} />
      <Text center fontSize={'h5'} color={'light'}>
        We'll be back shortly
      </Text>
    </MaintenanceContainer>
  );
}

const s = StyleSheet.create({
  logo: {
    marginTop: scaleHeight(25),
    width: scale(100),
  },
  spacing: {
    height: scaleHeight(40),
  },
  title: {
    maxWidth: SCREEN_WIDTH * 0.8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    minWidth: scale(130),
    marginTop: scaleHeight(15),
  },
});
