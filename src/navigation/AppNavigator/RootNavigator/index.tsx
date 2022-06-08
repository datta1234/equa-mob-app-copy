import React from 'react';
// import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';
import {
  ProjectDescriptionScreen,
  NotificationScreen,
  DisabledLoaderScreen,
  LoaderScreen,
} from 'screens';

import {
  ACCOUNT_SETUP_NAVIGATOR,
  ROOT_NAVIGATOR,
  MAIN_NAVIGATOR,
} from 'constants/routes';
import withTestSideMenu from 'hocs/withTestSideMenu';

import { MODAL_CONFIG } from '../../config';

import AccountSetupNavigator from './AccountSetupNavigator';
import { DISABLED_MODAL_CONFIG } from './config';
import MainNavigator from './MainNavigator';
import { RootStackParamList } from 'types/navigation';

const RootStack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      mode="modal">
      <RootStack.Screen name={MAIN_NAVIGATOR.NAME} component={MainNavigator} />
      <RootStack.Screen
        name={ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME}
        component={NotificationScreen}
        options={MODAL_CONFIG}
      />
      <RootStack.Screen
        name={ROOT_NAVIGATOR.LOADER_MODAL_SCREEN.NAME}
        component={LoaderScreen}
        options={MODAL_CONFIG}
      />
      <RootStack.Screen
        name={ROOT_NAVIGATOR.DISABLED_LOADER_MODAL_SCREEN.NAME}
        component={DisabledLoaderScreen}
        options={DISABLED_MODAL_CONFIG}
      />
      {/* TODO: Remove JR CODE ---------------------------  */}
      <RootStack.Screen
        name={ACCOUNT_SETUP_NAVIGATOR.NAVIGATOR_NAME.NAME}
        component={AccountSetupNavigator}
      />
      <RootStack.Screen
        name={ROOT_NAVIGATOR.SCREENS.PROJECT_DESCRIPTION_MODAL.NAME}
        component={ProjectDescriptionScreen}
        options={{ ...MODAL_CONFIG, gestureEnabled: false }}
      />
      {/* ------------------------------------------------- */}
    </RootStack.Navigator>
  );
}

// export default withTestSideMenu(RootNavigator);
export default RootNavigator;
