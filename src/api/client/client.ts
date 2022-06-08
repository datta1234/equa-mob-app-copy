import { ApolloClient, gql } from '@apollo/client';
import { assoc, pipe, reject } from 'ramda';
import { isNotDefined, getIn, isDefined } from 'utils/ramda';
import translator from 'utils/translator';

import { cache } from './cache';
import link from './link';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    # cart: Cart
  }

  # extend type Cart {
  #   userId: String
  #   value: String
  #   currency: String
  #   card: Card
  # }

  # extend type Card {
  #  name: String
  #  last4: String
  #  expMonth: String
  #  expYear: String
  #  brand: String
  # }

  input setProjectsInteresedInput {
    projectId: ID!
    interest: Float!
  }

  # extend type Mutation {
  #   setProjectsInterest(projectId: Int!): [ID]
  # }
`;

export const client = new ApolloClient({
  cache: cache,
  link: link,
  typeDefs: typeDefs,
});

// // TODO: Add localeMiddleware back in once translator has been setup for Android
// const localeMiddleware = setContext(async (_, { headers }) => {
//   const { languageTag } = await translator.getLanguage();
//   console.log('!!! localeMiddleware !!!!', languageTag);

//   return {
//     headers: assoc('Accept-Language', languageTag, headers),
//   };
// });

// // JR authMiddleware
// const authMiddleware = setContext(async (_, { headers }) => {
//   const authData = await authService.getData(); // Used for JR BE
//   console.log('AuthData', authData);

//   return {
//     headers: pipe(
//       assoc('Authorization', getIn('token', authData)),
//       reject(isNotDefined)
//     )(headers),
//   };
// });
