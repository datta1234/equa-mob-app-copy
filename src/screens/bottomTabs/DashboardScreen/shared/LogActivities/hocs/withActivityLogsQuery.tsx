import React, { useCallback } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';

import { ACTIVITY_LOG_FRAGMENT } from 'api/fragments';
import { getInOr } from 'utils/ramda';

const QUERY_NAME = 'GetUserEmissions';

const GET_ACTIVITIES_LOG = gql`
  query ActivitiesLog( $take: Int, $typeCode: String, $activityTypeCode: String,  $startDateTime: DateTime,  $endDateTime: DateTime, $orderByDesc: Boolean,  ) {
    ${QUERY_NAME}(input: {
      typeCode: $typeCode
      activityTypeCode: $activityTypeCode
      startDateTime: $startDateTime
      endDateTime: $endDateTime
      orderByDesc: $orderByDesc
      take: $take
    }) {
        ...activityLogFragment
      }
  }
  ${ACTIVITY_LOG_FRAGMENT}
`;

export default (WrappedComponent) => {
  function TargetComponent({ take = 10, orderByDesc = true, ...rest }) {
    const { data, loading, refetch } = useQuery(GET_ACTIVITIES_LOG, {
      fetchPolicy: 'cache-and-network',
      // pollInterval: 1500,
      variables: { take, orderByDesc },
    });

    useFocusEffect(
      useCallback(() => {
        refetch();
      }, [refetch])
    );

    return (
      <WrappedComponent
        {...rest}
        activityLogs={getInOr([], [QUERY_NAME], data)}
        isLoading={loading}
      />
    );
  }

  return React.memo(TargetComponent);
};
