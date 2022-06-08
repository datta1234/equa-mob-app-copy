import React, { useEffect } from 'react';

import q_logo from 'assets/svgs/q_logo.svg';
import spinner from 'assets/test_spinner.svg';
import PropTypes from 'prop-types';
import { Easing, Animated } from 'react-native';

import LocalSvg from 'components/LocalSvg';

const propTypes = {
  size: PropTypes.oneOf(['big', 'small']),
};

const defaultProps = {
  size: 'big',
};

const SIZES = {
  big: 180,
  small: 125,
};

function Spinner({ size }) {
  const spinValue = new Animated.Value(0);

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  function runAnimation() {
    return Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { resetBeforeIteration: true, iterations: Number.MAX_SAFE_INTEGER }
    );
  }

  useEffect(() => {
    // startAnimation();
    // animateWidth();
    const animation = runAnimation();
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <LocalSvg asset={q_logo} width={SIZES[size]} height={SIZES[size]} />
    </Animated.View>
  );
}

Spinner.defaultProps = defaultProps;
Spinner.propTypes = propTypes;
export default React.memo(Spinner);
