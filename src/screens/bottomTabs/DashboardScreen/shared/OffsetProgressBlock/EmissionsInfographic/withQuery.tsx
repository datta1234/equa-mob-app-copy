import React from 'react';

import { useQuery } from '@apollo/client';

import {
  GET_INFOGRAPHIC_EMISSIONS,
  GET_INFOGRAPHIC_EMISSIONS_QUERY_NAME,
} from 'api/operations/queries/getInfographicEmissions';

import ChartLoader from './shared/ChartLoader';

export default (WrappedComponent) => ({ ...rest }) => {
  const { data, loading } = useQuery(GET_INFOGRAPHIC_EMISSIONS, {
    fetchPolicy: 'cache-and-network',
    variables: {},
  });

  const emissionTotals = data?.[GET_INFOGRAPHIC_EMISSIONS_QUERY_NAME];

  if (loading) {
    return <ChartLoader />;
  }

  return (
    <WrappedComponent {...rest} data={emissionTotals} isLoading={loading} />
  );
};
