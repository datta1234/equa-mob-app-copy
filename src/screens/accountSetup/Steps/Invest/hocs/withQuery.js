import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { map, pipe } from 'ramda';

import { USER_FRAGMENT } from 'api/fragments';
import { getIn } from 'utils/ramda';

const GET_ME_QUERY_NAME = 'me';

const GET_ME = gql`
  query Me {
    ${GET_ME_QUERY_NAME} {
      ...userFragment
    }
  }
  ${USER_FRAGMENT}
`;

export default (WrappedComponent) => {
  return (props) => {
    const meQuery = useQuery(GET_ME, { fetchPolicy: 'cache-and-network' });

    return (
      <WrappedComponent
        {...props}
        me={getIn(['data', GET_ME_QUERY_NAME], meQuery)}
      />
    );
  };
};
