import React, { useCallback } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';

import { PORTFOLIOS_FRAGMENT } from 'api/fragments';
import {
  OffsetStackNavigationProp,
  OffsetStackRouteProp,
} from 'types/navigation';

import SelectPortfolioScreen from './SelectPortfolioScreen';

type Props = {
  route: OffsetStackRouteProp<'SelectPortfolioScreen'>;
  navigation: OffsetStackNavigationProp<'SelectPortfolioScreen'>;
};

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
const SelectPortfolio = ({}: Props) => {
  const { data, refetch, loading } = useQuery(GET_PORTFOLIOS, {
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const portfolios = data?.[QUERY_NAME] || [];
  return <SelectPortfolioScreen portfolios={portfolios} loading={loading} />;
};

SelectPortfolio.defaultProps = defaultProps;
export default SelectPortfolio;
