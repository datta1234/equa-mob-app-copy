import React from 'react';

import { TabBar } from 'react-native-tab-view';
import styled from 'styled-components';

const _StyledTabBar = styled(TabBar).attrs(({ theme, mode = 'light' }) => ({
  lazy: true,
  scrollEnabled: true,

  labelStyle: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    textTransform: 'capitalize',
    color: theme[mode].colors.dark,
  },
  tabStyle: {
    alignSelf: 'center',
    width: 'auto',
    paddingHorizontal: 32,
  },
  pressColor: 'gray', //for click (ripple) effect color
  style: {
    backgroundColor: 'white',
    shadowOffset: { height: 0, width: 0 },
    shadowColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  contentContainerStyle: {},
  indicatorStyle: { backgroundColor: theme[mode].colors.dark },

  shadowOffset: { height: 0, width: 0 },
  shadowColor: 'transparent',
  shadowOpacity: 0,
  elevation: 0,
}))``;

export const StyledTabBar = (props) => (
  <_StyledTabBar
    {...props}
    style={{
      backgroundColor: 'white',
      shadowOffset: { height: 0, width: 0 },
      shadowColor: 'transparent',
      shadowOpacity: 0,
      elevation: 0,
    }}
  />
);
