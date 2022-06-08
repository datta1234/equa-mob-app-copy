import React, { useEffect, useRef } from 'react';

import { Animated } from 'react-native';

export default (WrappedComponent) => (props) => {
  const showDisabled = !props.onPressHandler || props.isDisabled;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showDisabled) {
      Animated.timing(fadeAnim, {
        toValue: 0.5,
        duration: 900,
        useNativeDriver: false,
      }).start();

      return;
    }

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [showDisabled, fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <WrappedComponent {...props} />
    </Animated.View>
  );
};
