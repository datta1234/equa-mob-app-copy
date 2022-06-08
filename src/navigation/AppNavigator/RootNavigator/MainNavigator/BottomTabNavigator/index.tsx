import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  DiscoverScreen,
  FootprintScreen,
  DashboardScreen,
  PortfoliosScreen,
  TodayScreen,
} from 'screens/bottomTabs';
import { BOTTOM_TABS_NAVIGATOR } from 'constants/routes';
import { BottomTabParamList } from 'types/navigation';
import translator from 'utils/translator';

import CustomTabBar from './shared/CustomTabBar';
import {
  TodayIcon,
  ProfileIcon,
  PortfolioIcon,
  ProjectsIcon,
  DashboardIcon,
} from './shared/CustomTabBar/styles';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const defaultProps = {};
function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      {/* <Tab.Screen
        name={BOTTOM_TABS_NAVIGATOR.NEWS_FEED_SCREEN.NAME}
        component={TodayScreen}
        options={{
          tabBarLabel: translator.translate('bottomTabBar.news'),
          tabBarIcon: (props) => <TodayIcon {...props} />,
        }}
      /> */}

      <Tab.Screen
        name={BOTTOM_TABS_NAVIGATOR.DASHBOARD_SCREEN.NAME}
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: (props) => {
            return <DashboardIcon {...props} />;
          },
        }}
      />

      {/* <Tab.Screen
        name={BOTTOM_TABS_NAVIGATOR.PROFILE_SCREEN.NAME}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: (props) => <ProfileIcon {...props} />,
        }}
      /> */}
      <Tab.Screen
        name={BOTTOM_TABS_NAVIGATOR.PROJECT_DISCOVERY_SCREEN.NAME}
        component={PortfoliosScreen}
        options={{
          tabBarLabel: 'Projects',
          tabBarIcon: (props) => <ProjectsIcon {...props} />,
        }}
      />

      {/* <Tab.Screen
        name={BOTTOM_TABS_NAVIGATOR.DISCOVER_SCREEN.NAME}
        component={DiscoverScreen}
        options={{
          tabBarLabel: translator.translate('bottomTabBar.portfolio'),
          tabBarIcon: (props) => <PortfolioIcon {...props} />,
        }}
      /> */}
    </Tab.Navigator>
  );
}

BottomTabNavigator.defaultProps = defaultProps;
export default BottomTabNavigator;
