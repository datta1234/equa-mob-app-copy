import React, { useEffect } from 'react';

import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
  always,
  assoc,
  head,
  mergeDeepRight,
  objOf,
  pipe,
  tap,
  unless,
} from 'ramda';

import { getInOr, isDefined, getIn } from 'utils/ramda';

const QUERY_NAME = 'activity';

const GET_ACTIVITY = gql`
  query Activities($id: ID!) {
    ${QUERY_NAME}(id: $id) {
      title
      id
      thumbnailLogo(revision: "x150")
      emissionTypes {
        title
        options {
          id
          label
          value
        }
      }
    }
  }
`;

const GET_ACTIVITY_EMISSIONS = gql`
  query ActivityEmissions($id: ID!, $emissionTypeId: ID!) {
    ${QUERY_NAME}(id: $id) {
      id
      emissions(emissionTypeId: $emissionTypeId) {
        title
        options {
          id
          label
          value
          measuring
          unit
        }
      }
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const { getFootprintStateParam, setFootprintStateParam } = props;
    const route = useRoute();

    const [loadActivityEmissions, activityEmissionsQuery] = useLazyQuery(
      GET_ACTIVITY_EMISSIONS,
      {
        onCompleted: unless(
          always(getFootprintStateParam('emission.id')),
          pipe(
            getIn('activity.emissions.options'),
            head,
            tap(setFootprintStateParam('emission'))
          )
        ),
      }
    );

    const { data } = useQuery(GET_ACTIVITY, {
      variables: {
        id: route.params.activityId,
      },

      onCompleted: unless(
        always(getFootprintStateParam('emissionType.id')),
        pipe(
          getIn('activity.emissionTypes.options'),
          head,
          getIn('value'),
          tap(setFootprintStateParam('emissionType.id')),
          objOf('emissionTypeId'),
          assoc('id', route.params.activityId),
          objOf('variables'),
          loadActivityEmissions
        )
      ),
      // fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
      const emissionType = getFootprintStateParam('emissionType');

      if (isDefined(emissionType)) {
        loadActivityEmissions({
          variables: {
            id: route.params.activityId,
            emissionTypeId: emissionType.id,
          },
        });
      }
    }, [getFootprintStateParam('emissionType')]);

    const activity = getIn(QUERY_NAME, data);
    const navigation = useNavigation();

    useEffect(() => {
      if (isDefined(activity?.title)) {
        navigation.setOptions({ headerTitle: activity?.title });
      }
    }, [activity]);

    // isQrCode

    return (
      <WrappedComponent
        {...props}
        activity={mergeDeepRight(
          getInOr({}, QUERY_NAME, data),
          getInOr({}, QUERY_NAME, activityEmissionsQuery.data)
        )}
      />
    );
  };
};
