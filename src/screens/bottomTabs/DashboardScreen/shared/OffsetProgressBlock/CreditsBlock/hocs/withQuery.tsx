import React, { useEffect } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';

import { getInOr } from 'utils/ramda';

const QUERY_NAME = 'me';

const GET_ME = gql`
  query Me {
    ${QUERY_NAME} {
      carbonOffset
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const { data, refetch } = useQuery(GET_ME, {
      fetchPolicy: 'cache-and-network',
    });

    // const isFocused = useIsFocused();

    // useEffect(() => {
    //   if (isFocused) {
    //     refetch();
    //   }
    // }, [isFocused]);

    return (
      <WrappedComponent
        {...props}
        carbonOffset={getInOr(0, [QUERY_NAME, 'carbonOffset'], data)}
      />
    );
  };
};
