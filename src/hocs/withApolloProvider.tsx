import React from 'react';

import { ApolloProvider } from '@apollo/client';

import { client } from 'api/client/client';

export default (WrappedComponent) => (props) => {
  return (
    <ApolloProvider client={client}>
      <WrappedComponent {...props} />
    </ApolloProvider>
  );
};
