import { ApolloLink, from } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import authService from 'utils/auth';

import refreshTokenOnErrorLink from './refreshTokenOnErrorLink';

export let cachedAccessToken; // cached storage for the user token
export const cacheAccessToken = (value) => {
  cachedAccessToken = value;
};
export const clearCachedAccessToken = () => {
  cachedAccessToken = null;
};
const withToken = setContext(async () => {
  if (cachedAccessToken) return { accessToken: cachedAccessToken }; // if  have a cached value, return it immediately
  const accessToken = await authService.getAccessToken();
  cachedAccessToken = accessToken;
  return { accessToken };
});

const setHeadersLink = new ApolloLink((operation, forward) => {
  const { accessToken } = operation.getContext();
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  }));
  return forward(operation);
});

// const resetToken = onError(({ networkError }) => {
//   if (
//     networkError &&
//     networkError.name === 'ServerError' &&
//     networkError.statusCode === 401
//   ) {
//     accessToken = null; // remove cached token on 401 from the server
//   }
// });
const authLink = from([
  refreshTokenOnErrorLink,
  withToken.concat(setHeadersLink),
]); //.concat(resetToken);

export default authLink;
