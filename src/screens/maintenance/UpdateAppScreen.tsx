import React, { useState, useEffect } from 'react';
import { Linking, Image, StyleSheet, View } from 'react-native';

import { images } from 'assets';
import Button from 'components/Button';
import { Title, Text } from 'components/Typography';
import { scale, scaleHeight, SCREEN_WIDTH } from 'constants/layout';
import links from 'constants/links';
import { runAfterInteraction } from 'utils/helpers';

import { displayName as appName } from './../../../app.json';
import MaintenanceContainer from './MaintenanceContainer';

const appUpdateLink = links.appUpdateLink;

export default function UpdateAppScreen() {
  const [isSupported, setIsSupported] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const canOpenLink = async () => {
      const supported = await Linking.canOpenURL(appUpdateLink); //supported currently not working on Android
      setLoading(false);
      runAfterInteraction(() => setIsSupported(true)); //should be setIsSupported(supported). Issue with android! TODO: Fix permissions. I have already done: https://github.com/facebook/react-native/issues/30497
    };

    canOpenLink();
  }, []);
  const handleUpdate = () => {
    isSupported && Linking.openURL(appUpdateLink);
  };

  const logo = images.LOGO_DARK_TAP;

  return (
    <MaintenanceContainer>
      <Image source={logo} style={s.logo} resizeMode="contain" />
      <View style={s.spacing} />
      <Title style={s.title} bold center color={'primary'} fontSize={'h2'}>
        {`Your version of\n${appName} is out of date!`}
      </Title>
      <View style={s.spacing} />
      <View style={s.spacing} />
      <Text center fontSize={'h6'} color={'light'}>
        Please go to the App{'\n'}Store to update it
      </Text>
      <Button
        color={'primary'}
        style={s.button}
        isLoading={loading}
        isDisabled={!isSupported}
        onPressHandler={handleUpdate}>
        Update
      </Button>
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
  },
  button: {
    minWidth: scale(130),
    marginTop: scaleHeight(15),
  },
});
