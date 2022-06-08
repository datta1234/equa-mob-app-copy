import React from 'react';

import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

export default (WrappedComponent) => (props) => (
  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <WrappedComponent {...props} />
  </SafeAreaProvider>
);
