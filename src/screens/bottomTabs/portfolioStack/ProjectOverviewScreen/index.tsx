import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { PROJECT_FRAGMENT } from 'api/fragments';
import {
  PortfolioStackNavigationProp,
  PortfolioStackRouteProp,
} from 'types/navigation';

import ProjectOverviewScreen from './ProjectOverviewScreen';

type Props = {
  route: PortfolioStackRouteProp<'ProjectOverviewScreen'>;
  navigation: PortfolioStackNavigationProp<'ProjectOverviewScreen'>;
};

const QUERY_NAME = 'GetProjects';
const GET_PROJECT = gql`
  query GetProjects( $id: Int) {
    ${QUERY_NAME}(input:{id: $id}) {
      ...project
    }
  }
  ${PROJECT_FRAGMENT}
`;

const defaultProps = {};
function ProjectDetailScreen({ route }: Props) {
  const id = route?.params?.id;
  const category = route?.params?.category;

  const { data } = useQuery(GET_PROJECT, {
    fetchPolicy: 'cache-and-network',
    variables: { id },
  });

  if (!data) {
    return null;
  }
  const project = data?.[QUERY_NAME]?.[0];

  return <ProjectOverviewScreen category={category} project={project} />;
}

ProjectDetailScreen.defaultProps = defaultProps;
export default ProjectDetailScreen;
