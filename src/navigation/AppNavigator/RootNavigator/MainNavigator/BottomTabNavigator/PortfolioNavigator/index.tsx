import React from 'react';
// import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';

import { PORTFOLIO_NAVIGATOR } from 'constants/routes';
import {
  PortfoliosScreen,
  PortfolioOverviewScreen,
  ProjectOverviewScreen,
  ComingSoonScreen,
} from 'screens/bottomTabs/portfolioStack';
import { PortfolioStackParamList } from 'types/navigation';

const PortfolioStack = createStackNavigator<PortfolioStackParamList>();

const defaultProps = {};
function PortfolioNavigator() {
  return (
    <PortfolioStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PortfolioStack.Screen
        name={PORTFOLIO_NAVIGATOR.PROJECT_DISCOVERY_SCREEN.NAME}
        component={PortfoliosScreen}
      />
      <PortfolioStack.Screen
        name={PORTFOLIO_NAVIGATOR.PORTFOLIO_OVERVIEW_SCREEN.NAME}
        component={PortfolioOverviewScreen}
      />
      <PortfolioStack.Screen
        name={PORTFOLIO_NAVIGATOR.PROJECT_OVERVIEW_SCREEN.NAME}
        component={ProjectOverviewScreen}
      />
      <PortfolioStack.Screen
        name={PORTFOLIO_NAVIGATOR.COMING_SOON_SCREEN.NAME}
        component={ComingSoonScreen}
      />
    </PortfolioStack.Navigator>
  );
}

PortfolioNavigator.defaultProps = defaultProps;
export default PortfolioNavigator;
