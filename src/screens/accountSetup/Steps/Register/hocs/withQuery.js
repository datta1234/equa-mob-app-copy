import React, { useEffect } from 'react';

import { gql, useQuery } from '@apollo/client';
import { map, mergeDeepLeft, pick, pipe, tap, values } from 'ramda';

import { USER_FRAGMENT } from 'api/fragments';
import { getIn, getInOr } from 'utils/ramda';

import { FIELDS } from '../constants';

const QUERY_NAME = 'me';

const GET_ME = gql`
  query Me {
    ${QUERY_NAME} {
      ...userFragment
      location
    }
  }
  ${USER_FRAGMENT}
`;

export default (WrappedComponent) => {
  return ({ setFormParams, ...props }) => {
    const { data, loading, error } = useQuery(GET_ME, {
      fetchPolicy: 'cache-and-network',
      onCompleted: pipe(
        getInOr({}, QUERY_NAME),
        pick(pipe(map(getIn('NAME')), values)(FIELDS)),
        mergeDeepLeft,
        setFormParams
      ),
    });

    return <WrappedComponent {...props} me={getIn('me', data)} />;
  };
};
