import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import { curry } from 'ramda';
import { Animated } from 'react-native';

const defaultConfig = {
  animationConfig: {
    duration: 750,
    initialValue: 0.5,
    useNativeDriver: true,
  },
  styles: {},
};

const withFadeIn = curry(({ animationConfig, styles }, WrappedComponent) => {
  const propTypes = {
    fadeAnimStyle: PropTypes.object,
  };

  const defaultProps = {
    fadeAnimStyle: {},
  };

  const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(animationConfig.initialValue))
      .current;

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        ...animationConfig,
      }).start();
    }, [fadeAnim]);

    return (
      <Animated.View
        style={{
          flex: 1,
          ...styles,
          opacity: fadeAnim,
        }}>
        <WrappedComponent {...props} />
      </Animated.View>
    );
  };

  FadeInView.propTypes = propTypes;
  FadeInView.defaultProps = defaultProps;
  return FadeInView;
});

export { withFadeIn };
export default withFadeIn(defaultConfig);
