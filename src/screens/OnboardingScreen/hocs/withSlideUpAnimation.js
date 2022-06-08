import React, { useEffect, useRef } from 'react';

import { Animated, InteractionManager } from 'react-native';

export default (WrappedComponent) => (props) => {
  const animated = useRef(new Animated.Value(255)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(animated, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 1250,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY: animated }],
          opacity: animatedOpacity,
        },
      ]}>
      <WrappedComponent {...props} />
    </Animated.View>
  );
};
