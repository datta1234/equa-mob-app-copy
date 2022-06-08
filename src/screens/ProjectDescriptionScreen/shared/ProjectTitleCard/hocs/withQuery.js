import React, { useEffect } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/core';
import { mergeDeepLeft } from 'ramda';
import { InteractionManager } from 'react-native';

import { getIn, getInOr } from 'utils/ramda';

const QUERY_NAME = 'project';

const GET_PROJECT = gql`
  query Project($id: ID!) {
    ${QUERY_NAME}(id: $id) {
      usersCount
      members(count: 4) {
        id
        thumbnailAvatar(revision: "x40")
      }
      isSelected
    }
  }
`;

export default (WrappedComponent) => {
  return ({ removeProjectFromPortfolio, addProjectToPortfolio, ...rest }) => {
    const route = useRoute();
    const project = getIn('params.project', route);

    const [loadProject, { loading, data, error }] = useLazyQuery(GET_PROJECT, {
      fetchPolicy: 'cache-and-network',
      variables: {
        id: project.id,
      },
    });

    useEffect(() => {
      InteractionManager.runAfterInteractions(() => {
        loadProject();
      });
    }, []);

    return (
      <WrappedComponent
        {...rest}
        project={mergeDeepLeft(rest.project, getInOr({}, QUERY_NAME, data))}
        addProjectToPortfolio={() => addProjectToPortfolio(rest.project.id)}
        removeProjectFromPortfolio={() =>
          removeProjectFromPortfolio(rest.project.id)
        }
      />
    );
  };
};
