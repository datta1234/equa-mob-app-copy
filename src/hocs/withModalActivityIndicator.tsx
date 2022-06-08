import React, { useState, useRef, useEffect } from 'react';

import { rgba } from 'polished';
import { when, mergeDeepRight, curry, not } from 'ramda';
import { View, StyleSheet, Animated } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import styled from 'styled-components/native';

import { getIn, alt } from 'utils/ramda';

const defaultConfig = {
  size: 40,
  indicatorComponent: SkypeIndicator,
  loadingKey: 'isLoading',
};
const animationSettings = {
  duration: 450,
  useNativeDriver: false,
};

const withModalActivityIndicator = curry((_config, WrappedComponent, props) => {
  const [isLoaderShow, setShowLoader] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const {
    size,
    indicatorComponent: IndicatorComponent,
    loadingKey,
  } = mergeDeepRight(defaultConfig, _config);

  const isLoading = alt(
    getIn(loadingKey),
    getIn('route.params.isLoading'),
  )(props);

  const hideLoader = () => setShowLoader(false);

  useEffect(() => {
    if (not(isLoading)) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        ...animationSettings,
      }).start(when(getIn('finished'), hideLoader));
    }

    if (isLoading) {
      setShowLoader(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        ...animationSettings,
        duration: 150,
      }).start();
    }
  }, [isLoading]);

  return (
    <View style={styles.container}>
      {isLoaderShow && (
        <Animated.View
          style={[styles.activityContainer, { opacity: fadeAnim }]}>
          <ActivityContainer>
            <IndicatorComponent color="#fff" count={5} size={size} />
          </ActivityContainer>
        </Animated.View>
      )}
      <WrappedComponent {...props} />
    </View>
  );
});

export { withModalActivityIndicator };
export default withModalActivityIndicator(defaultConfig);

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2,
  },
});

const ActivityContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    rgba(theme[mode].colors.dark, 0.25)};

  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
`;
