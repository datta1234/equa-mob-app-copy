import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { isNotDefined, getIn } from 'utils/ramda';

import { LoaderOverlay } from '../../AddFootprintActivityForm/shared';

const QUERY_NAME = 'footprintActivity';

const GET_FOOTPRINT_ACTIVITY = gql`
  query FootprintActivity($id: ID!) {
    ${QUERY_NAME}(id: $id) {
      activity {
        id
      }
      emission {
        id
        label
        measuring
        unit
        value
      }
      emissionType {
        id
        label
        value
      }
      id
      label
      value
      productName
      carbonDioxideVolume
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const footprintActivityId = getIn('route.id', props);

    const { data, error } = useQuery(GET_FOOTPRINT_ACTIVITY, {
      variables: {
        id: footprintActivityId,
      },
      fetchPolicy: 'cache-and-network',
    });

    if (isNotDefined(getIn(QUERY_NAME, data))) {
      return <LoaderOverlay />;
    }

    return (
      <WrappedComponent
        {...props}
        footprintActivity={getIn(QUERY_NAME, data)}
        // activity={getInOr({}, QUERY_NAME, data)}
      />
    );
  };
};
