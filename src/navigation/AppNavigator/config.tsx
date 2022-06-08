import React from 'react';

import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Typography } from 'components';
import colors from 'constants/colors';
import { AUTH_NAVIGATOR, SIGN_UP_NAVIGATOR } from 'constants/routes';
import translator from 'utils/translator';

export const DARK_LAYOUT = {
  headerStyle: {
    backgroundColor: colors.DARK_ACCENT,
    // height: 80, // fixme react header
    // alignItems: 'flex-end',
    borderWidth: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
  headerTitleContainerStyle: { paddingVertical: 10 },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export const ONBOARDING_CONFIG = {
  ...DARK_LAYOUT,
  title: 'AQ Green',
  headerRight: ({ tintColor }) => {
    const navigation = useNavigation();

    const goToSignUpScreen = () =>
      navigation.navigate(AUTH_NAVIGATOR.NAME, {
        screen: SIGN_UP_NAVIGATOR.NAVIGATOR_NAME.NAME,
        params: { screen: SIGN_UP_NAVIGATOR.SCREENS.CREDENTIALS_FORM.NAME },
      });

    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 15 }}
        onPress={goToSignUpScreen}>
        <Typography.Text
          size="normal"
          mode="dark"
          style={{ color: tintColor, textTransform: 'capitalize' }}>
          {translator.translate('onboarding.buttons.skip')}
        </Typography.Text>
      </TouchableOpacity>
    );
  },
};
