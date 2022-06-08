import React, { useEffect, useRef } from 'react';

import { InteractionManager } from 'react-native';
import { Animated } from 'react-native';

export default (WrappedComponent) => (props) => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(animatedOpacity, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <Animated.View style={{ opacity: animatedOpacity }}>
      <WrappedComponent {...props} />
    </Animated.View>
  );
};
