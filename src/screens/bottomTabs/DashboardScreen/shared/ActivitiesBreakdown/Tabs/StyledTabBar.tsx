import React from 'react';

import { equals, length, nth, pipe } from 'ramda';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';

import { Typography } from 'components';
import colors from 'constants/colors';
import { SCREEN_WIDTH } from 'constants/layout';
import { SelectedSlices } from 'models/SelectedSlice';
import { getIn } from 'utils/ramda';

const tabBarWidth = SCREEN_WIDTH - 40;

const renderTabBarItem = (tabBarOptions) => {
  const { navigationState, key } = tabBarOptions;

  const isActive = pipe(
    nth(navigationState.index),
    getIn('key'),
    equals(key)
  )(navigationState.routes);
  return (
    <TouchableOpacity {...tabBarOptions} style={s.touchable}>
      <Typography.Text
        size={length(navigationState.routes) >= 3 ? 'small' : 'normal'}
        numberOfLines={1}
        style={[s.text, isActive && { color: colors.NAVY }]}>
        {tabBarOptions.route.title}
      </Typography.Text>
    </TouchableOpacity>
  );
};

export const StyledTabBar = ({ setSelectedSlice, ...tabBarProps }) => {
  const getTabWidth = () => {
    if (length(tabBarProps.navigationState.routes) >= 4) {
      return tabBarWidth / 4;
    }

    return tabBarWidth / length(tabBarProps.navigationState.routes);
  };

  return (
    <TabBar
      {...tabBarProps}
      lazy
      scrollEnabled={length(tabBarProps.navigationState.routes) >= 3}
      renderTabBarItem={renderTabBarItem}
      tabStyle={{ width: getTabWidth() }}
      onTabPress={({ route, preventDefault }) => {
        // show / hide infographic slice
        setSelectedSlice((prev) =>
          prev === route.key ? SelectedSlices.SELECT_NONE : route.key
        );
        //   preventDefault();// prevent switching the tab
      }}
      style={s.tabBar}
      indicatorStyle={{
        backgroundColor: colors.NAVY,
        // width: getTabWidth(),
      }}
    />
  );
};

const s = StyleSheet.create({
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  tabBar: {
    backgroundColor: 'transparent',
    width: tabBarWidth,
  },
});
