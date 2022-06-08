import React, { useEffect, useRef } from 'react';

// import PropTypes from 'prop-types';
import { Animated } from 'react-native';

import { Typography } from 'components';

import { StyledProjectImage, Container } from './styles';

const propTypes = {};

const defaultProps = {};

function Slide({ img, description, isActive }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeTextAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();

      Animated.timing(fadeTextAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false,
      }).start();

      return;
    }

    Animated.timing(fadeAnim, {
      toValue: 0.5,
      duration: 250,
      useNativeDriver: false,
    }).start();

    Animated.timing(fadeTextAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isActive]);

  return (
    <Container>
      <Animated.View style={{ opacity: fadeAnim }}>
        <StyledProjectImage source={img} />
      </Animated.View>

      <Typography.Text mode="dark" style={{ lineHeight: 21 }}>
        {description}
      </Typography.Text>
    </Container>
  );
}

Slide.defaultProps = defaultProps;
Slide.propTypes = propTypes;
export default Slide;
