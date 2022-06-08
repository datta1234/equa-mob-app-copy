import { createHttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import Config from 'react-native-config';

const wsLink = new WebSocketLink({
  uri: `${Config.API_SUB_URL}/graphql`, //`wss://api.codebooyah.com/graphqlsubs` //'ws://localhost:4000/subscriptions',
  options: {
    reconnect: true,
    // connectionParams: {
    //    Authorization: `Bearer ${session.token}`,
    // },
  },
});

export const httpLink = createHttpLink({ uri: `${Config.API_URL}/graphql` });

const httpUploadLink = createUploadLink({ uri: `${Config.API_URL}/graphql` });
// console.log('DeviceInfo', DeviceInfo);

// The split function takes three parameters:

// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpUploadLink,
);

export default splitLink;
