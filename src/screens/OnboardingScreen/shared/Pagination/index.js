import React, { useRef } from 'react';
import { useEffect } from 'react';

import { times } from 'ramda';
// import PropTypes from 'prop-types';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';

import { DotContainer, DotsContainer, DotWrapper } from './styles';

const propTypes = {};

const defaultProps = {};

export const ANIMATION_CONFIG = {
  duration: 350,
  useNativeDriver: false,
};

const WIDTH = {
  DEFAULT: 15,
  ACTIVE: 35,
};

const OPACITY = {
  DEFAULT: 0.5,
  ACTIVE: 1,
};

function PaginationItem({ isActive }) {
  const widthAnim = useRef(new Animated.Value(WIDTH.DEFAULT)).current;
  const fadeAnim = useRef(new Animated.Value(OPACITY.DEFAULT)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: isActive ? WIDTH.ACTIVE : WIDTH.DEFAULT,
      ...ANIMATION_CONFIG,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: isActive ? OPACITY.ACTIVE : OPACITY.DEFAULT,
      ...ANIMATION_CONFIG,
    }).start();
  }, [isActive, fadeAnim, widthAnim]);

  return (
    <Animated.View
      style={[
        styles.animatedDotWrapper,
        {
          width: widthAnim,
          opacity: fadeAnim,
        },
      ]}>
      <DotContainer isActive />
    </Animated.View>
  );
}

function PaginationItems({ size, paginationIndex, scrollToIndex }) {
  const renderDot = (index) => (
    <TouchableOpacity onPress={() => console.log({ index })}>
      <DotWrapper>
        <PaginationItem key={index} isActive={index == paginationIndex} />
      </DotWrapper>
    </TouchableOpacity>
  );

  const renderDots = times(renderDot);

  return <DotsContainer>{renderDots(size)}</DotsContainer>;
}

PaginationItems.defaultProps = defaultProps;
PaginationItems.propTypes = propTypes;
export default React.memo(PaginationItems);

const styles = StyleSheet.create({
  animatedDotWrapper: {
    height: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
});
