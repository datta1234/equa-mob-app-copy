import React from 'react';

import { StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { useTheme } from 'styled-components/native';

import { Typography } from 'components';

function StyledTabBar({ ...props }) {
  const theme = useTheme().light;

  const s = styles(theme);

  return (
    <TabBar
      {...props}
      indicatorStyle={s.indicator}
      style={s.tabBar}
      renderLabel={({ route, focused, color }) => (
        <Typography.Text
          color={'primary'}
          bold={true} //{focused}
          // numberOfLines={1}
          style={s.label}>
          {route.title}
        </Typography.Text>
      )}
    />
  );
}

export default StyledTabBar;

const styles = (theme) =>
  StyleSheet.create({
    tabBar: {
      backgroundColor: theme.background.secondary,
      marginHorizontal: 25,
      elevation: 0,
    },
    indicator: {
      backgroundColor: 'transparent', //theme.background.dark,
    },
    label: {
      paddingHorizontal: 10,
      //width: 150,
    },
  });
