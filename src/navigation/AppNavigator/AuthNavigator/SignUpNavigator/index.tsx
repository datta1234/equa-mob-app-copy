import React from 'react';
// import PropTypes from 'prop-types';

import { gql, useQuery } from '@apollo/client';
import { createStackNavigator } from '@react-navigation/stack';
import CredentialsForm from 'screens/auth/signUp/CredentialsForm';
import MobileConfirmationForm from 'screens/auth/signUp/MobileConfirmationForm';

import { IS_LOGGED_IN } from 'api/operations/queries/getIsLoggedIn';
import { BackButton } from 'components';
import { SIGN_UP_NAVIGATOR } from 'constants/routes';

import config from '../config';

const Stack = createStackNavigator();

function SignUpNavigator() {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SIGN_UP_NAVIGATOR.SCREENS.CREDENTIALS_FORM.NAME}
        component={CredentialsForm}
        options={{
          ...config.DARK_LAYOUT,
          headerTitle: null,
          headerLeft: (props) => <BackButton {...props} mode="dark" />,
        }}
      />

      {isLoggedIn && (
        <Stack.Screen
          name={SIGN_UP_NAVIGATOR.SCREENS.MOBILE_VEREFICATION_FORM.NAME}
          component={MobileConfirmationForm}
          options={{
            ...config.DARK_LAYOUT,
            headerTitle: null,
            headerLeft: (props) => <BackButton {...props} mode="dark" />,
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export default SignUpNavigator;
