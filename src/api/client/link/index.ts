import { from } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'

import authLink from './authLink'
import errorLink from './errorLink'
import isLoggedInLink from './isLoggedInLink'
import roundTripLink from './roundTripLink'
import splitLink from './terminatingLink'

// TODO: Add retry link and test
const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error,
  },
})
//TODO: find alternative to using subscriptions-transport-ws so that links can handle forward operations
// See: https://github.com/apollographql/apollo-server/issues/6058
// See: https://github.com/apollographql/apollo-client/issues/9061
// Use when updated: graphql-ws: https://github.com/enisdenjo/graphql-ws
const link = from([
  isLoggedInLink,
  authLink,
  errorLink,
  //TODO: move roundTripLink into a splitLink to chose roundTrip when not passing a subscription
  // roundTripLink, // This link can't be used with `subscriptions-transport-ws` package as it doesn't properly implement forward operations
  splitLink,
])

export default link
