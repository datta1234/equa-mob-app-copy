import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { mergeDeepLeft, pipe } from 'ramda';

import { getInOr } from 'utils/ramda';

const QUERY_NAME = 'me';

const GET_ME = gql`
  query Me {
    ${QUERY_NAME} {
      id
      mobileNumber
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const { data } = useQuery(GET_ME, {
      // fetchPolicy: 'cache-first',
      fetchPolicy: 'cache-and-network',
    });

    return (
      <WrappedComponent
        {...props}
        me={pipe(mergeDeepLeft(props.me), getInOr({}, QUERY_NAME))(data)}
        isLoading={props.isLoading}
      />
    );
  };
};
