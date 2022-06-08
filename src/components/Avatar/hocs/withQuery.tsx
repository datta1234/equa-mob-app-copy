import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { mergeDeepLeft, pipe } from 'ramda';

import { getInOr } from 'utils/ramda';

const GET_USER_QUERY_NAME = 'GetUser';

const GET_ME = gql`
  query GetUser {
    ${GET_USER_QUERY_NAME} {
      id
      firstName
      lastName
    }
  }
`;
//thumbnailAvatar(revision: "x120")

export default (WrappedComponent) => (props) => {
  const { data, loading } = useQuery(GET_ME, {
    // fetchPolicy: 'cache-first',
    fetchPolicy: 'cache-and-network',
  });

  const user = data?.[GET_USER_QUERY_NAME] ?? {};

  return (
    <WrappedComponent
      {...props}
      me={pipe(mergeDeepLeft(props?.me))(user)}
      isLoading={props.isLoading}
    />
  );
};
