import { onError } from '@apollo/client/link/error';
import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from '@sentry/react-native';

import { isTestingEnv } from 'utils/helpers';

const logErrorsToConsole = (Errors) => {
  Errors.forEach(({ message, locations, path, extensions }) => {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code: ${extensions?.code}`,
      );
    }
  });
};

const logErrorsForTestingEnv = ({
  operationName,
  graphQLErrors,
  networkError,
}) => {
  if (__DEV__ || !isTestingEnv) {
    // only log for release mode testing Envs
    return;
  }
  if (graphQLErrors) {
    graphQLErrors?.forEach(({ message, locations, path }) => {
      Sentry.captureMessage(
        'GraphQL Error',
        `Operation: ${operationName}, Message: ${message}, location ${locations}, Path: ${path}`,
      );
      // crashlytics().log(
      //   'GraphQL Error',
      //   `Message: ${message}, location ${locations}, Path: ${path}`
      // );
      // Sentry.captureException();
    });
  }
  if (networkError) {
    Sentry.captureMessage(`[Network error]: ${networkError}`);
  }
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward, response }) => {
    // TODO: Added general error reporting here and don't pass on network or other errors
    const operationName = operation?.operationName;
    logErrorsForTestingEnv({ operationName, graphQLErrors, networkError });
    // // Conditionally ignore errors ...
    // if (operation.operationName === "IgnoreErrorsQuery") {
    //   response.errors = null;
    // }

    if (graphQLErrors) {
      logErrorsToConsole(graphQLErrors);
    }

    if (networkError) {
      console.log(`[Network error]:`, {networkError});
      if (networkError.message === 'Network request failed') {
        // handle failed network request (prompt user)
       
      }
    }
  },
);

export default errorLink;
