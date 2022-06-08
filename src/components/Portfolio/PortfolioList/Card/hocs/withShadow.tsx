import React from 'react';

import { View } from 'react-native';

import { shadow } from 'constants/ui';
import { isNotDefined } from 'utils/ramda';

export default (WrappedComponent) => (props) => {
  const { withShadow } = props;

  if (isNotDefined(withShadow)) {
    return <WrappedComponent {...props} />;
  }

  return (
    <View style={{ ...shadow.secondary, alignItems: 'center' }}>
      <WrappedComponent {...props} />
    </View>
  );
};
