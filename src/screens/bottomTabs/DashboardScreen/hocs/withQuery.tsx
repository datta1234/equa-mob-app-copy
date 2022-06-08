import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { getInOr } from 'utils/ramda';

const GET_USER_QUERY_NAME = 'GetUser';

const GET_USER = gql`
  query GetUser {
    ${GET_USER_QUERY_NAME} {
      id
      firstName
      lastName
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const { data } = useQuery(GET_USER, {
      //pollInterval: 1500,
      fetchPolicy: 'cache-and-network',
    });

    return (
      <WrappedComponent
        {...props}
        user={getInOr({}, GET_USER_QUERY_NAME, data)}
      />
    );
  };
};
