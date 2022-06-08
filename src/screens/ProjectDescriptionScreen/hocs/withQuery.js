import React, { useEffect } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/core';
import { InteractionManager } from 'react-native';

import { getIn } from 'utils/ramda';

const QUERY_NAME = 'project';

const GET_PROJECT = gql`
  query Project($id: ID!) {
    ${QUERY_NAME}(id: $id) {
      category
      description
      developer
      verification
      emissionReduction
      id
      location
      name
      price
      projectType
      registrationDate
      status
      thumbnailBackground(revision: "x950x700")
      thumbnailLogo(revision: "x150")
      webcamLink
      websiteLink

      developmentGoals {
        id
        name
        thumbnailLogo(revision: "x150")
      }

      standards {
        id
        name
        thumbnailLogo(revision: "x165x40")
      }
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const route = useRoute();
    const project = getIn('params.project', route);

    const [loadProject, { data }] = useLazyQuery(GET_PROJECT, {
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
        {...props}
        project={getIn(QUERY_NAME, data)}
        loadProject={loadProject}
      />
    );
  };
};
