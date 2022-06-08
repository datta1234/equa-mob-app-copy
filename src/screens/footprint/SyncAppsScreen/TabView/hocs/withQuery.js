import React from 'react';

import { gql, useQuery } from '@apollo/client';

const QUERY_NAME = 'activities';

import { getInOr } from 'utils/ramda';

const GET_ACTIVITIES = gql`
  query Activities {
    ${QUERY_NAME} {
      title
      id
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const { data } = useQuery(GET_ACTIVITIES, {});

    return (
      <WrappedComponent {...props} activities={getInOr([], QUERY_NAME, data)} />
    );
  };
};
