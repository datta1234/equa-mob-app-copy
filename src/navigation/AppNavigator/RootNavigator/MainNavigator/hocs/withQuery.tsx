import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { map, pipe, objOf, reject } from 'ramda';
import FastImage from 'react-native-fast-image';

import { PROJECT_MINIATURE } from 'api/fragments';
import { getIn, isNotDefined } from 'utils/ramda';

const GET_ACTIVITIES_QUERY_NAME = 'activities';
const GET_PROJECTS_QUERY_NAME = 'projects';

const GET_ACTIVITIES = gql`
  query Activities {
    ${GET_ACTIVITIES_QUERY_NAME} {
      title
      id
      thumbnailLogo(revision: "x150")
    }
  }
`;

const GET_PROJECTS = gql`
  query Projects {
    ${GET_PROJECTS_QUERY_NAME}(count: 10, page: 1) {
      hasMore
      currentPage
      currentCount
      ${GET_PROJECTS_QUERY_NAME}{
        ...projectMiniatureFragment
        thumbnailBackground(revision: "x110")
        isSelected
      }
    }
  }
  ${PROJECT_MINIATURE}
`;

export default (WrappedComponent) => {
  return (props) => {
    // useQuery(GET_ACTIVITIES, {
    //   onCompleted: pipe(
    //     getIn(GET_ACTIVITIES_QUERY_NAME),
    //     map(getIn('thumbnailLogo')),
    //     map(objOf('uri')),
    //     reject(pipe(getIn('uri'), isNotDefined)),
    //     FastImage.preload
    //   ),
    // });

    // useQuery(GET_PROJECTS, {
    //   onCompleted: pipe(
    //     getIn([GET_PROJECTS_QUERY_NAME, GET_PROJECTS_QUERY_NAME]),
    //     map(getIn('thumbnailBackground')),
    //     map(objOf('uri')),
    //     FastImage.preload
    //     // map(getIn('thumbnailLogo')),
    //     // map(objOf('uri')),
    //     // FastImage.preload
    //   ),
    // });

    return <WrappedComponent {...props} />;
  };
};
