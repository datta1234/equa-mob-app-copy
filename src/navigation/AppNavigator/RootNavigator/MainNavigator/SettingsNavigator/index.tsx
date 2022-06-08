import React from 'react';
// import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';

import { SETTINGS_NAVIGATOR } from 'constants/routes';
import {
  MenuScreen,
  SettingsScreen,
  ProfileScreen,
  CarbonCodeScreen,
} from 'screens/settings';
import { SettingsStackParamList } from 'types/navigation';

const SettingsStack = createStackNavigator<SettingsStackParamList>();

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingsStack.Screen
        name={SETTINGS_NAVIGATOR.MENU_SCREEN.NAME}
        component={MenuScreen}
      />
      <SettingsStack.Screen
        name={SETTINGS_NAVIGATOR.CARBON_CODE_SCREEN.NAME}
        component={CarbonCodeScreen}
      />
      <SettingsStack.Screen
        name={SETTINGS_NAVIGATOR.SETTINGS_SCREEN.NAME}
        component={SettingsScreen}
      />

      <SettingsStack.Screen
        name={SETTINGS_NAVIGATOR.PROFILE_SCREEN.NAME}
        component={ProfileScreen}
      />
    </SettingsStack.Navigator>
  );
}

export default SettingsNavigator;
