import React from 'react';
// import PropTypes from 'prop-types';

import { gql, useQuery } from '@apollo/client';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import { IS_LOGGED_IN } from 'api/operations/queries/getIsLoggedIn';
import {
  APP_NAVIGATOR,
  AUTH_NAVIGATOR,
  ROOT_NAVIGATOR,
} from 'constants/routes';
import { AppStackParamList } from 'types/navigation';

import { OnboardingScreen, TourScreen } from '../../screens';

import AuthNavigator from './AuthNavigator';
import { ONBOARDING_CONFIG } from './config';
import RootNavigator from './RootNavigator';

// import { MODAL_CONFIG } from './config';

const AppStack = createStackNavigator<AppStackParamList>();

function AppNavigator() {
  //NOTE: Might be better to call isLoggedInVar() as this returns a more accurate result since query sometimes resets isLoggedIn outside functional components
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppStack.Navigator>
        <AppStack.Screen
          name={APP_NAVIGATOR.TOUR_SCREEN.NAME}
          component={TourScreen}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name={AUTH_NAVIGATOR.NAME}
          component={AuthNavigator}
          options={{
            headerShown: false,
          }}
        />
        {isLoggedIn && (
          <AppStack.Screen
            name={ROOT_NAVIGATOR.NAME}
            component={RootNavigator}
            options={{
              headerShown: false,
            }}
          />
        )}
        {/* TODO: Remove JR CODE ---------------------------  */}
        <AppStack.Screen
          name={APP_NAVIGATOR.ONBOARDING_SCREEN.NAME}
          component={OnboardingScreen}
          options={ONBOARDING_CONFIG}
        />
        {/* ------------------------------------------------- */}
      </AppStack.Navigator>
    </>
  );
}

export default AppNavigator;
