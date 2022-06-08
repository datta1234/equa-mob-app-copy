import React, { useEffect } from 'react';

import { gql, useQuery } from '@apollo/client';
import { filter, map, pipe, reject } from 'ramda';

import { PROJECT_MINIATURE } from 'api/fragments';
import { getInOr, getIn } from 'utils/ramda';

const QUERY_NAME = 'recommendedProjects';

const GET_RECOMMENDED_PROJECTS = gql`
  query RecomendedProjects {
    ${QUERY_NAME} {
      ...projectMiniatureFragment
      thumbnailBackground(revision: "x210x155")
      isSelected
    }
  }
  ${PROJECT_MINIATURE}
`;

export default (WrappedComponent) => {
  return (props) => {
    const { data, loading, error } = useQuery(GET_RECOMMENDED_PROJECTS);

    pipe(
      getInOr([], QUERY_NAME),
      reject(getIn('isSelected')),
      map(getIn('id'))
    )(data);

    return (
      <WrappedComponent {...props} data={pipe(getInOr([], QUERY_NAME))(data)} />
    );
  };
};
