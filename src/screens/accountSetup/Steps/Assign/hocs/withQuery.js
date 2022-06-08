import React, { useEffect } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';

import { USER_FRAGMENT } from 'api/fragments';
import { getInOr, getIn } from 'utils/ramda';

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
    }
  }
  ${USER_FRAGMENT}
`;

export default (WrappedComponent) => {
  return (props) => {
    const { data } = useQuery(GET_MY_PROJECTS, {
      fetchPolicy: 'cache-and-network',
    });
    const meQuery = useQuery(GET_ME, {
      fetchPolicy: 'cache-and-network',
    });

    // useEffect(() => {
    //   goToDisabledScreen();
    // }, []);

    return (
      <WrappedComponent
        {...props}
        me={getIn(['data', GET_ME_QUERY_NAME], meQuery)}
        data={getInOr([], GET_MY_PROJECTS_QUERY_NAME, data)}
      />
    );
  };
};
