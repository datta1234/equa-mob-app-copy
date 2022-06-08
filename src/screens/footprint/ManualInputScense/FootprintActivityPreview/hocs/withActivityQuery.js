import React, { useEffect } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';

import { getInOr, isDefined, getIn, isNotDefined } from 'utils/ramda';

import { LoaderOverlay } from '../../AddFootprintActivityForm/shared';

const QUERY_NAME = 'activity';

const GET_ACTIVITY = gql`
  query Activities($id: ID!, $emissionTypeId: ID!) {
    ${QUERY_NAME}(id: $id) {
      title
      id
      thumbnailLogo(revision: "x150")
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

export default (WrappedComponent) => {
  return (props) => {
    const { footprintActivity, isActive } = props;

    const { data } = useQuery(GET_ACTIVITY, {
      variables: {
        id: footprintActivity.activity.id,
        emissionTypeId: footprintActivity.emissionType.id,
      },

      // fetchPolicy: 'cache-and-network',
    });

    const activity = getIn(QUERY_NAME, data);
    const navigation = useNavigation();

    useEffect(() => {
      if (isActive && isDefined(activity?.title)) {
        navigation.setOptions({
          headerTitle: activity?.title,
          gestureEnabled: false,
        });
      }
    }, [activity, isActive]);

    if (isNotDefined(getIn(QUERY_NAME, data))) {
      return <LoaderOverlay />;
    }

    return (
      <WrappedComponent {...props} activity={getInOr({}, QUERY_NAME, data)} />
    );
  };
};
