import { ApolloLink } from '@apollo/client/core';

const roundTripLink = new ApolloLink((operation, forward) => {
  // forward on operation if in release mode
  if (!__DEV__) {
    return forward(operation);
  }
  // Called before operation is sent to server
  operation.setContext({ start: new Date() });

  return forward(operation).map((data) => {
    // Called after server responds
    const time = new Date() - operation.getContext().start;
    console.log(
      `Operation ${operation.operationName} took ${time} to complete`,
    );
    return data;
  });
});

export default roundTripLink;
