import React, { useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import { pipe, pick, partial, andThen, curry } from 'ramda';

import { PROJECT_MINIATURE } from 'api/fragments';
import { getInOr, getIn } from 'utils/ramda';
import { getParam, setParam } from 'utils/ramda';

const QUERY_NAME = 'projects';

const GET_PROJECTS = gql`
  query Projects($count: Int!, $page: Int!) {
    ${QUERY_NAME}(count: $count, page: $page) {
      hasMore
      currentPage
      currentCount
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
  function TargetComponent({
    getPaginationParam,
    setPaginationParam,
    setPaginationParams,
    checkProjectsIsSelected,
    ...rest
  }) {
    const { data, loading, fetchMore } = useQuery(GET_PROJECTS, {
      // fetchPolicy: 'cache-and-network',
      // notifyOnNetworkStatusChange: true,

      variables: {
        count: getPaginationParam('currentCount'),
        page: getPaginationParam('currentPage'),
      },

      onCompleted: pipe(
        getInOr({}, QUERY_NAME),
        pick(['currentCount', 'currentPage', 'hasMore']),
        setPaginationParams
      ),
    });

    const onFetchMoreHandler = pipe(
      partial(fetchMore, [
        {
          variables: {
            count: getPaginationParam('currentCount'),
            page: getPaginationParam('currentPage') + 1,
          },
        },
      ]),
      andThen(getIn('data')),
      andThen(getIn(QUERY_NAME)),
      andThen(pick(['currentCount', 'currentPage', 'hasMore'])),
      andThen(setPaginationParams)
    );

    return (
      <WrappedComponent
        {...rest}
        projects={pipe(getInOr([], [QUERY_NAME, QUERY_NAME]))(data)}
        isLoading={loading}
        fetchMore={getPaginationParam('hasMore') && onFetchMoreHandler}
      />
    );
  }

  return pipe(React.memo, withPaginationState)(TargetComponent);
};

const withPaginationState = (WrappedComponent) => {
  return (props) => {
    const [paginationState, setPaginationState] = useState({
      currentPage: 1,
      currentCount: 10,
    });

    function onPaginationParamsChange(input) {
      setPaginationState(input);
    }

    const setpaginationParam = curry((lensKey, key) =>
      onPaginationParamsChange(setParam(paginationState, lensKey, key))
    );
    const getPaginationParam = getParam(paginationState);

    return (
      <WrappedComponent
        {...props}
        getPaginationParam={getPaginationParam}
        setPaginationParam={setpaginationParam}
        setPaginationParams={setPaginationState}
      />
    );
  };
};
