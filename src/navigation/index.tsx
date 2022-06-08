import React from 'react';
// import PropTypes from 'prop-types';

import analytics from '@react-native-firebase/analytics';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
// import { DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { BASE_NAVIGATOR, APP_NAVIGATOR } from 'constants/routes';
import { BaseStackParamList } from 'types/navigation';

import { SplashScreen, NotFoundScreen } from '../screens';

import AppNavigator from './AppNavigator';
import { withSafeAreaProvider } from './hocs';
import { navigationRef } from './RootNavigation';

const BaseStack = createStackNavigator<BaseStackParamList>();

function InitialNavigator() {
  const routeNameRef = React.useRef<string>(null);

  const onReady = () => {
    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
  };

  const onStateChange = async (state: NavigationState) => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute().name;
    routeNameRef.current = currentRouteName; // Save the current route name for later comparison

    if (previousRouteName !== currentRouteName) {
      await analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
      onStateChange={onStateChange}
      // theme={DefaultTheme}
    >
      <BaseStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <BaseStack.Screen
          name={BASE_NAVIGATOR.SPLASH_SCREEN.NAME}
          component={SplashScreen}
        />
        <BaseStack.Screen
          name={BASE_NAVIGATOR.NOT_FOUND_SCREEN.NAME}
          component={NotFoundScreen}
        />
        <BaseStack.Screen name={APP_NAVIGATOR.NAME} component={AppNavigator} />
      </BaseStack.Navigator>
    </NavigationContainer>
  );
}

export default withSafeAreaProvider(InitialNavigator);
