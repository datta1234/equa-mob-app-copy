import React from 'react';

import { ExternalContainer } from '../styles';

export default (WrappedComponent) => (props) => {
  return (
    <ExternalContainer>
      <WrappedComponent {...props} />
    </ExternalContainer>
  );
};
