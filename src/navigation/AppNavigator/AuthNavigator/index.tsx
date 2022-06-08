import React from 'react';
// import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';

import {
  SIGN_UP_NAVIGATOR,
  SIGN_IN_NAVIGATOR,
  AUTH_NAVIGATOR,
} from 'constants/routes';
import { NotificationScreen } from 'screens';
import {
  LoaderScreen,
  SignInScreen,
  ForgotPasswordScreen,
  SignUpScreen,
  VerifyScreen,
} from 'screens/auth';
import { AuthStackParamList } from 'types/navigation';

import { MODAL_CONFIG } from '../../config';

import SignInNavigator from './SignInNavigator';
import SignUpNavigator from './SignUpNavigator';

// import { MODAL_CONFIG } from './config';

const AuthStack = createStackNavigator<AuthStackParamList>();

function AppNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      mode="modal">
      <AuthStack.Screen
        name={AUTH_NAVIGATOR.SIGN_IN_SCREEN.NAME}
        component={SignInScreen}
      />
      <AuthStack.Screen
        name={AUTH_NAVIGATOR.SIGN_UP_SCREEN.NAME}
        component={SignUpScreen}
      />
      <AuthStack.Screen
        name={AUTH_NAVIGATOR.VERIFY_SCREEN.NAME}
        component={VerifyScreen}
      />
      <AuthStack.Screen
        name={AUTH_NAVIGATOR.FORGOT_PASSWORD_SCREEN.NAME}
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen
        name={AUTH_NAVIGATOR.LOADER_MODAL_SCREEN.NAME}
        component={LoaderScreen}
      />
      <AuthStack.Screen
        name={AUTH_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME}
        component={NotificationScreen}
        options={MODAL_CONFIG}
      />
      {/* TODO: Remove JR CODE ---------------------------  */}
      <AuthStack.Screen
        name={SIGN_IN_NAVIGATOR.NAVIGATOR_NAME.NAME}
        component={SignInNavigator}
      />
      <AuthStack.Screen
        name={SIGN_UP_NAVIGATOR.NAVIGATOR_NAME.NAME}
        component={SignUpNavigator}
      />
      {/* ------------------------------------------------- */}
    </AuthStack.Navigator>
  );
}

export default AppNavigator;
