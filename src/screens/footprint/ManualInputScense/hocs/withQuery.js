import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { pipe, pick, map, reverse } from 'ramda';

import { getInOr } from 'utils/ramda';

const QUERY_NAME = 'footprintActivities';

import { LoaderOverlay } from '../AddFootprintActivityForm/shared';

const GET_FOOTPRINT_ACTIVITIES = gql`
  query FootprintActivities($count: Int!, $page: Int!) {
    ${QUERY_NAME}(count: $count, page: $page) {
      hasMore
      currentPage
      currentCount
      ${QUERY_NAME}{
        id
        label
      }
    }
  }
`;

export default (WrappedComponent) => {
  function TargetComponent({
    getPaginationParam,
    setPaginationParam,
    setPaginationParams,
    checkProjectsIsSelected,
    ...rest
  }) {
    const { data, loading } = useQuery(GET_FOOTPRINT_ACTIVITIES, {
      fetchPolicy: 'cache-and-network',
      variables: {
        count: 4,
        page: 1,
      },
    });

    if (loading) {
      return <LoaderOverlay />;
    }

    return (
      <WrappedComponent
        {...rest}
        footprintActivities={pipe(
          getInOr([], [QUERY_NAME, QUERY_NAME]),
          map(pick(['id', 'label'])),
          reverse
        )(data)}
        isLoading={loading}
      />
    );
  }

  return pipe(React.memo)(TargetComponent);
};
