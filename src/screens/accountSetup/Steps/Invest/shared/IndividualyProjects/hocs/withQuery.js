import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { map, pipe } from 'ramda';

import { PROJECT_MINIATURE } from 'api/fragments';
import { getInOr } from 'utils/ramda';

const QUERY_NAME = 'projects';

const GET_PROJECTS = gql`
  query Projects {
    ${QUERY_NAME}(count: 4, page: 1) {
      ${QUERY_NAME}{
        ...projectMiniatureFragment
        thumbnailBackground(revision: "x110")
        isSelected
      }
    }
  }
  ${PROJECT_MINIATURE}
`;

export default (WrappedComponent) => {
  return (props) => {
    const { data, loading, error, refetch } = useQuery(GET_PROJECTS, {
      // fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
    });

    return (
      <WrappedComponent
        {...props}
        data={pipe(getInOr([], [QUERY_NAME, QUERY_NAME]))(data)}
        refetch={refetch}
        isLoading={loading}

        // data={getInOr([], [QUERY_NAME, QUERY_NAME], data)}
      />
    );
  };
};
