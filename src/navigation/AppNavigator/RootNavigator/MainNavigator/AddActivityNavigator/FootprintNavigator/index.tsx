import React from 'react';
// import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';
import {
  ManualInputFormScreen,
  QRCodeScannerScreen,
  UberAuth,
} from 'screens/footprint';
import SyncAppsTabsScreen from 'screens/footprint/SyncAppsScreen/TabView';

import { Typography } from 'components';
import { FOOTPRINT_NAVIGATOR } from 'constants/routes';

import { QR_CODE_CONFIG, MANUAL_INPUT_FORM_CONFIG } from './config';

const Stack = createStackNavigator();

function FootprintNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={FOOTPRINT_NAVIGATOR.SCREENS.MANUAL_FORM_SCREEN.NAME}
        component={ManualInputFormScreen}
        options={MANUAL_INPUT_FORM_CONFIG}
      />

      <Stack.Screen
        name={FOOTPRINT_NAVIGATOR.SCREENS.QR_SCANNER_SCREEN.NAME}
        component={QRCodeScannerScreen}
        options={QR_CODE_CONFIG}
      />

      <Stack.Screen
        name={FOOTPRINT_NAVIGATOR.SCREENS.SYNC_APPS_SCREEN.NAME}
        component={SyncAppsTabsScreen}
        options={{
          ...MANUAL_INPUT_FORM_CONFIG,
          headerTitle: () => (
            <Typography.Title level={3}>Sync App</Typography.Title>
          ),
        }}
      />
      <Stack.Screen
        name={FOOTPRINT_NAVIGATOR.SCREENS.UBER_AUTH.NAME}
        component={UberAuth}
        options={{
          ...MANUAL_INPUT_FORM_CONFIG,
          headerTitle: () => (
            <Typography.Title level={3}>
              {FOOTPRINT_NAVIGATOR.SCREENS.UBER_AUTH.LABEL}
            </Typography.Title>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default FootprintNavigator;
