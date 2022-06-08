import React, { useEffect, useRef } from 'react';

import { Animated } from 'react-native';

import Typography from 'components/Typography';
// import PropTypes from 'prop-types';

import {
  ItemContainer,
  ItemTitleContainer,
  IconContainer,
  ActiveDot,
  ActiveDotContainer,
} from './styles';

const propTypes = {};

const defaultProps = {};

function CustomTabBarItem({ renderTabBarIcon, tabBarLabel, isActive }) {
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 1.1];
  const scale = animation.interpolate({ inputRange, outputRange });
  const TabBarIcon = renderTabBarIcon;

  useEffect(() => {
    Animated.spring(animation, {
      toValue: isActive ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [{ scale }],
      }}>
      <ItemContainer isActive={isActive}>
        <IconContainer>
          <TabBarIcon isActive={isActive} />
        </IconContainer>

        <ItemTitleContainer>
          <Typography.Text color={isActive ? 'light' : 'light'} size="tiny">
            {tabBarLabel}
          </Typography.Text>
        </ItemTitleContainer>
      </ItemContainer>

      {isActive && (
        <ActiveDotContainer>
          <ActiveDot />
        </ActiveDotContainer>
      )}
    </Animated.View>
  );
}

CustomTabBarItem.defaultProps = defaultProps;
CustomTabBarItem.propTypes = propTypes;
export default CustomTabBarItem;
