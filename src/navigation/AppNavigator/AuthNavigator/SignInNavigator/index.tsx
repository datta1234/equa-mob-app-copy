import React from 'react';
// import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';
import CredentialsForm from 'screens/auth/signIn/CredentialsForm';

import { BackButton } from 'components';
import { SIGN_IN_NAVIGATOR } from 'constants/routes';

import config from '../config';

const Stack = createStackNavigator();

function SignInNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SIGN_IN_NAVIGATOR.SCREENS.CREDENTIALS_FORM.NAME}
        component={CredentialsForm}
        options={{
          ...config.DARK_LAYOUT,
          headerTitle: null,
          headerLeft: (props) => <BackButton {...props} mode="dark" />,
        }}
      />
    </Stack.Navigator>
  );
}

export default SignInNavigator;
