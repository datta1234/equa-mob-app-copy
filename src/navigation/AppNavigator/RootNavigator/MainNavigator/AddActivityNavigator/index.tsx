import React from 'react';
// import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';

import { ProjectsOverviewScreen } from 'screens';
import {
  AddActivityScreen,
  SelectScreen,
  SelectFootPrintActivity,
} from 'screens/addActivity';
import { ADD_ACTIVITY_NAVIGATOR, FOOTPRINT_NAVIGATOR } from 'constants/routes';
import { AddActivityStackParamList } from 'types/navigation';

import { MODAL_CONFIG } from '../../../../config';

import FootprintNavigator from './FootprintNavigator';

const AddActivityStack = createStackNavigator<AddActivityStackParamList>();

function AddActivityNavigator() {
  return (
    <AddActivityStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AddActivityStack.Screen
        name={ADD_ACTIVITY_NAVIGATOR.SELECT_ACTIVITY_MODAL_SCREEN.NAME}
        component={SelectScreen}
        options={{
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
      <AddActivityStack.Screen
        name={ADD_ACTIVITY_NAVIGATOR.ADD_ACTIVITY_SCREEN.NAME}
        component={AddActivityScreen}
      />
      {/* TODO: Remove JR CODE ---------------------------  */}
      <AddActivityStack.Screen
        name={ADD_ACTIVITY_NAVIGATOR.SCREENS.PROJECTS_OVERVIEW_MODAL.NAME}
        component={ProjectsOverviewScreen}
        options={{
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
      <AddActivityStack.Screen
        name={
          ADD_ACTIVITY_NAVIGATOR.SCREENS.SELECT_FOOTPRINT_ACTIVITY_MODAL.NAME
        }
        component={SelectFootPrintActivity}
        // options={MODAL_CONFIG}
        options={{
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
      <AddActivityStack.Screen
        name={FOOTPRINT_NAVIGATOR.NAVIGATOR_NAME.NAME}
        component={FootprintNavigator}
      />
      {/* ------------------------------------------------- */}
    </AddActivityStack.Navigator>
  );
}

export default AddActivityNavigator;
