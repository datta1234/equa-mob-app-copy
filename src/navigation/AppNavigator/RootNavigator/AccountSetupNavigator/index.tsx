import React from 'react';

// import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import {
  AssignScreen,
  ConfirmScreen,
  InvestScreen,
  RegisterScreen,
} from 'screens/accountSetup';

// import { BackButton } from 'components';
import { ACCOUNT_SETUP_NAVIGATOR } from 'constants/routes';

// import config from '../config';

const Stack = createStackNavigator();

function AccountSetupNavigator() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name={ACCOUNT_SETUP_NAVIGATOR.SCREENS.REGISTER_STEP.NAME}
          component={RegisterScreen}
        />

        <Stack.Screen
          name={ACCOUNT_SETUP_NAVIGATOR.SCREENS.CHOOSE_PROJECTS_STEP.NAME}
          component={InvestScreen}
        />

        <Stack.Screen
          name={ACCOUNT_SETUP_NAVIGATOR.SCREENS.ASSIGN_STEP.NAME}
          component={AssignScreen}
        />

        <Stack.Screen
          name={ACCOUNT_SETUP_NAVIGATOR.SCREENS.CONFIRM_STEP.NAME}
          component={ConfirmScreen}
        />
      </Stack.Navigator>
    </>
  );
}

export default AccountSetupNavigator;
