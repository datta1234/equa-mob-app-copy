import React, { useCallback } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { BarIndicator } from 'react-native-indicators';

import colors from 'constants/colors';
import {
  OffsetStackNavigationProp,
  OffsetStackRouteProp,
} from 'types/navigation';

import ActiveAutoOffset from './ActiveAutoOffset';
import SubAutoOffset from './SubAutoOffset';

type Props = {
  route: OffsetStackRouteProp<'AutoOffsetScreen'>;
  navigation: OffsetStackNavigationProp<'AutoOffsetScreen'>;
};

const QUERY_NAME = 'GetUserSubscriptions';

const GET_SUBSCRIPTIONS = gql`
  query GetUserSubscriptions {
    ${QUERY_NAME} {
      id
      progressPercentage
      kgCo2e
      portfolio {
        id
        name
        media {
          format
          id
          mediaId
          typeCode
          url
        }
      }
      priceInCents
    }
  }
`;

const defaultProps = {};
const AutoOffsetOverview = ({ route }: Props) => {
  const { selectedPortfolioId, ...restParams } = route?.params || {};
  const { data, refetch, loading } = useQuery(GET_SUBSCRIPTIONS, {
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (loading) {
    <BarIndicator size={70} color={colors.ACCENT} />;
  }

  const { id, progressPercentage, portfolio } = data?.[QUERY_NAME]?.[0] || {};

  return id ? (
    <ActiveAutoOffset
      subscriptionId={id}
      portfolio={portfolio}
      progress={progressPercentage}
    />
  ) : (
    <SubAutoOffset selectedPortfolioId={selectedPortfolioId} />
  );
};

AutoOffsetOverview.defaultProps = defaultProps;
export default AutoOffsetOverview;
