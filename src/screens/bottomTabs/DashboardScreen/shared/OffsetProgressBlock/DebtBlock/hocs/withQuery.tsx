import React, { useEffect } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useIsFocused } from '@react-navigation/native';

import { getInOr } from 'utils/ramda';

const QUERY_NAME = 'me';

const GET_ME = gql`
  query Me {
    ${QUERY_NAME} {
      carbonDioxideVolumeSum
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const { data } = useQuery(GET_ME, {
      // pollInterval: 500,
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
        carbonDioxideVolumeSum={getInOr(
          0,
          [QUERY_NAME, 'carbonDioxideVolumeSum'],
          data
        )}
      />
    );
  };
};

// [Log] data – {me: {__typename: "User", carbonDioxideVolumeSum: 1403.92, carbonOffset: 0.21}} (index.bundle, line 308561)
