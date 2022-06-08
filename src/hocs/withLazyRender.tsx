import React, { useEffect, useState } from 'react';

// import PropTypes from 'prop-types';
import { not } from 'ramda';
import { StyleSheet, InteractionManager, View } from 'react-native';

export default (WrappedComponent) => (props) => {
  const [isReadyForRender, setReadyForRender] = useState(true);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setReadyForRender(true);
    });
  }, []);

  if (not(isReadyForRender)) {
    return null;
  }

  return <WrappedComponent {...props} />;
};
