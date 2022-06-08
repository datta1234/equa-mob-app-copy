import React from 'react';
// import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';
// import { BackButton } from 'components';
import { ManualInputScreen } from 'screens';

import {
  BOTTOM_TABS_NAVIGATOR,
  ADD_ACTIVITY_NAVIGATOR,
  MAIN_NAVIGATOR,
  FOOTPRINT_NAVIGATOR,
  SETTINGS_NAVIGATOR,
  PORTFOLIO_NAVIGATOR,
  OFFSETS_NAVIGATOR,
} from 'constants/routes';
import { MainStackParamList } from 'types/navigation';

import { MODAL_CONFIG } from '../../../config';

import AddActivityNavigator from './AddActivityNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import PortfolioNavigator from './BottomTabNavigator/PortfolioNavigator';
import { withQuery } from './hocs';
import OffsetNavigator from './OffsetNavigator';
import SettingsNavigator from './SettingsNavigator';

const disabledGestureScreenList = [
  ADD_ACTIVITY_NAVIGATOR.ADD_ACTIVITY_SCREEN.NAME,
  FOOTPRINT_NAVIGATOR.SCREENS.MANUAL_FORM_SCREEN.NAME,
  FOOTPRINT_NAVIGATOR.SCREENS.SYNC_APPS_SCREEN.NAME,
];

const MainStack = createStackNavigator<MainStackParamList>();

function MainNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      mode="modal">
      <MainStack.Screen
        name={BOTTOM_TABS_NAVIGATOR.NAME}
        component={BottomTabNavigator}
      />
      <MainStack.Screen
        name={SETTINGS_NAVIGATOR.NAME}
        component={SettingsNavigator}
      />
      <MainStack.Screen
        name={OFFSETS_NAVIGATOR.NAME}
        component={OffsetNavigator}
      />
      <MainStack.Screen
        name={PORTFOLIO_NAVIGATOR.NAME}
        component={PortfolioNavigator}
      />
      <MainStack.Screen
        name={ADD_ACTIVITY_NAVIGATOR.NAME}
        component={AddActivityNavigator}
        options={(props) => {
          const isGestureDisabled = disabledGestureScreenList.includes(
            props.route?.params?.screen,
          );

          return { ...MODAL_CONFIG, gestureEnabled: !isGestureDisabled };
        }}
      />
      {/* TODO: Remove JR CODE ---------------------------  */}
      <MainStack.Screen
        name={MAIN_NAVIGATOR.SCREENS.MANUAL_INPUT_MODAL.NAME}
        component={ManualInputScreen}
        options={MODAL_CONFIG}
      />
      {/* ------------------------------------------------- */}
    </MainStack.Navigator>
  );
}

export default withQuery(MainNavigator);
