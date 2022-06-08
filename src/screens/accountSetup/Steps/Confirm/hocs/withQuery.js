import React, { useCallback, useEffect } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { USER_FRAGMENT, PROJECT_MINIATURE } from 'api/fragments';
import { getInOr } from 'utils/ramda';

const GET_MY_PROJECTS_QUERY_NAME = 'myProjects';
const GET_ME_QUERY_NAME = 'me';

const GET_MY_PROJECTS = gql`
  query MyProjects {
    ${GET_MY_PROJECTS_QUERY_NAME} {
      id
      location
      name
      status
      projectType
      thumbnailBackground(revision: "x110")
      interest
    }
  }
`;

const GET_ME = gql`
  query Me {
    ${GET_ME_QUERY_NAME} {
      ...userFragment
      carbonDioxideVolumeSum
      carbonOffset
    }
  }
  ${USER_FRAGMENT}
`;

export default (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();
    const { data } = useQuery(GET_MY_PROJECTS, {
      fetchPolicy: 'cache-and-network',
    });

    const meQuery = useQuery(GET_ME, {
      fetchPolicy: 'cache-and-network',
    });

    return (
      <WrappedComponent
        {...props}
        myProjects={getInOr([], GET_MY_PROJECTS_QUERY_NAME, data)}
        me={getInOr({}, ['data', GET_ME_QUERY_NAME], meQuery)}
      />
    );
  };
};
