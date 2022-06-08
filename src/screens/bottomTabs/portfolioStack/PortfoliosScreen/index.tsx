import React, { useCallback } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';

import { PORTFOLIOS_FRAGMENT } from 'api/fragments';
import ProjectsContainer from 'components/Containers/ProjectsContainer';
import PortfolioList from 'components/Portfolio/PortfolioList';
import {
  BottomTabRouteProp,
  BottomTabsNavigationProp,
  PortfolioStackNavigationProp,
  PortfolioStackRouteProp,
} from 'types/navigation';

type Props = {
  route:
    | BottomTabRouteProp<'ProjectDiscoveryScreen'>
    | PortfolioStackRouteProp<'ProjectDiscoveryScreen'>;
  navigation:
    | BottomTabsNavigationProp<'ProjectDiscoveryScreen'>
    | PortfolioStackNavigationProp<'ProjectDiscoveryScreen'>;
};

const screenTitle = 'PROJECT DISCOVERY';
const info =
  'View our portfolios and their projects \nthat you can offset against!';
const details = 'The projects for each portfolio \nare frequently updated';

const QUERY_NAME = 'GetPortfolios';

const GET_PORTFOLIOS = gql`
  query GetPortfolios( $id: Int) {
    ${QUERY_NAME}(input:{id: $id}) {
      ...portfolios
    }
  }
  ${PORTFOLIOS_FRAGMENT}
`;

const defaultProps = {};
const ProjectDiscoveryScreen = ({}: Props) => {
  const { data, refetch, loading } = useQuery(GET_PORTFOLIOS, {
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const portfolios = data?.[QUERY_NAME] || [];

  return (
    <ProjectsContainer
      contentContainerStyle={{ paddingBottom: 30 }}
      title={screenTitle}
      bodyTitle={info}
      bodyInfo={details}>
      <PortfolioList isLoading={loading} portfolios={portfolios} />
    </ProjectsContainer>
  );
};

ProjectDiscoveryScreen.defaultProps = defaultProps;
export default ProjectDiscoveryScreen;
