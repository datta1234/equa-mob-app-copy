import React from 'react';

import { gql, useQuery } from '@apollo/client';

import { PORTFOLIO_FRAGMENT } from 'api/fragments';
import useNotification from 'hooks/useNotification';
import {
  PortfolioStackNavigationProp,
  PortfolioStackRouteProp,
} from 'types/navigation';

import PortfolioOverviewScreen from './PortfolioOverviewScreen';

type Props = {
  route: PortfolioStackRouteProp<'PortfolioOverviewScreen'>;
  navigation: PortfolioStackNavigationProp<'PortfolioOverviewScreen'>;
};

const QUERY_NAME = 'GetPortfolios';

const GET_PORTFOLIO = gql`
  query GetPortfolio( $id: Int) {
    ${QUERY_NAME}(input:{id: $id}) {
      ...portfolio
    }
  }
  ${PORTFOLIO_FRAGMENT}
`;

const defaultProps = {};
const PortfolioOverview = ({ route, navigation }: Props) => {
  const showNotification = useNotification();
  const id = route?.params?.id;

  const { data, loading } = useQuery(GET_PORTFOLIO, {
    fetchPolicy: 'cache-and-network',
    onError: (data) => {
      navigation.goBack();
      showNotification({ errors: data });
    },
    variables: { id: id },
  });

  const portfolio = data?.[QUERY_NAME][0] || {};

  return <PortfolioOverviewScreen portfolio={portfolio} loading={loading} />;
};

PortfolioOverview.defaultProps = defaultProps;
export default PortfolioOverview;
