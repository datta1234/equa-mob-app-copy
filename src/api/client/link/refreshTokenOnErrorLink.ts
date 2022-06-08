import { fromPromise } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { screens } from 'constants/routes';
import * as RootNavigation from 'navigation/RootNavigation';
import authService from 'utils/auth';

import { isLoggedInVar } from 'api/client/cache';
import { client } from 'api/client/client';

import {
  GET_REFRESH_TOKEN,
  GET_REFRESH_TOKEN_QUERY_NAME,
} from '../../operations/queries/getRefreshToken';

import { cacheAccessToken, clearCachedAccessToken } from './authLink';

export const gqlErrorExtensionCodes =
  //: { [filter: string]: BROADCAST_TYPE }
  {
    NOT_AUTHENTICATED: 'AUTH_NOT_AUTHENTICATED',
    SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  };

function logOut() {
  // clearing tokens and logging out if logged in
  if (isLoggedInVar()) {
    authService.removeTokens();
    client.clearStore(); // clear store and don't refetch active queries ( TODO: fix - seems to refetch anyway)
    isLoggedInVar(false);
    RootNavigation.replace(...screens.welcome());
  }
}

async function getRefreshToken(variables) {
  const resp = await client.query({
    query: GET_REFRESH_TOKEN,
    variables: variables,
    fetchPolicy: 'network-only',
  });

  const token = resp?.data?.[GET_REFRESH_TOKEN_QUERY_NAME]?.token;
  await authService.storeTokens(token); // await to ensure correct tokens are used on next call

  return token;
}

async function refreshToken() {
  const storage = {};
  return Promise.all([
    authService.getUserId(),
    authService.getAccessToken(),
    authService.getRefreshToken(),
  ]).then(async (values) => {
    [storage.userId, storage.accessToken, storage.refreshToken] = values;
    if (!storage.refreshToken || !storage.userId) {
      return Promise.reject(
        new Error('Null Auth data values returned from storage'),
      );
    }
    return getRefreshToken(storage);
  });
}
let isRefreshing = false;

const setIsRefreshing = (value) => {
  isRefreshing = value;
};

let tokenRefreshPromise = Promise.resolve();

const refreshTokenOnErrorLink = onError(
  ({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // Note for loop as we cannot use forEach with async functions
        if (err.extensions?.code === gqlErrorExtensionCodes.NOT_AUTHENTICATED) {
          if (!isRefreshing) {
            setIsRefreshing(true);
            tokenRefreshPromise = refreshToken()
              .then(({ accessToken }) => {
                cacheAccessToken(accessToken);
                // set context etc here ... operation.setContext({ accessToken })
              })
              .catch(() => {
                clearCachedAccessToken();
                logOut();
              })
              .finally(() => setIsRefreshing(false));
          }
          return fromPromise(tokenRefreshPromise).flatMap(() =>
            forward(operation),
          );
        }
      }
    }
  },
);

export default refreshTokenOnErrorLink;
