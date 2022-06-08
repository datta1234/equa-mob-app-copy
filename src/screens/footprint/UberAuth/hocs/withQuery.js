import React from 'react';

import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { assoc, evolve, head, mergeDeepLeft, objOf, pipe } from 'ramda';

import { renameKeys, getInOr, getIn } from 'utils/ramda';

const QUERY_NAME = 'activities';

const GET_ACTIVITIES = gql`
  query Activities {
    ${QUERY_NAME} {
      id
    }
  }
`;

const GET_ACTIVITY = gql`
  query Activities($id: ID!) {
    activity(id: $id) {
      id
      emissionTypes {
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
    activity(id: $id) {
      id
      emissions(emissionTypeId: $emissionTypeId) {
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

const getRandomDifferent = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default (WrappedComponent) => {
  return (props) => {
    const [getActivityEmissions, activityEmissionsQuery] = useLazyQuery(
      GET_ACTIVITY_EMISSIONS,
      {
        onCompleted: console.log,
      }
    );

    const [getActivity, activityQuery] = useLazyQuery(GET_ACTIVITY, {
      onCompleted: ({ activity }) => {
        pipe(
          getIn('emissionTypes.options'),
          head,
          getIn('id'),
          objOf('emissionTypeId'),
          assoc('id', activity.id),
          objOf('variables'),
          getActivityEmissions
        )(activity);
      },
    });

    const { data } = useQuery(GET_ACTIVITIES, {
      onCompleted: pipe(
        getInOr([], 'activities'),
        head,
        getIn('id'),
        objOf('id'),
        objOf('variables'),
        getActivity
      ),
    });

    // console.log(
    //   'cons',
    //   mergeDeepLeft(
    //     getInOr({}, 'data.activity', activityEmissionsQuery),
    //     getInOr({}, 'data.activity', activityQuery)
    //   )
    // );

    const targetActivity = pipe(
      mergeDeepLeft(getInOr({}, 'data.activity', activityEmissionsQuery)),
      evolve({
        emissionTypes: pipe(getIn('options'), head),
        emissions: pipe(getIn('options'), head),
      }),
      renameKeys({
        emissionTypes: 'emissionType',
        emissions: 'emission',
      }),
      assoc('value', 123.4)
    )(getInOr({}, 'data.activity', activityQuery));

    return (
      <WrappedComponent
        {...props}
        activities={getInOr([], QUERY_NAME, data)}
        targetActivity={targetActivity}
        // targetActivity={pipe(

        // )()}
      />
    );
  };
};
