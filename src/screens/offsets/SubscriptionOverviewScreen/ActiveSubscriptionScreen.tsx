import React from 'react';

import { gql, useQuery } from '@apollo/client';
import { isThisMonth } from 'date-fns';
import styled from 'styled-components/native';

import { SUBSCRIPTION_FRAGMENT } from 'api/fragments';
import { Button, Typography } from 'components';
import { scaleHeight } from 'constants/layout';

import useOffsetNav from '../hooks/useOffsetNav';

import SubscriptionOverview from './components/SubscriptionOverview';

const QUERY_NAME = 'GetUserSubscriptions';

const GET_SUBSCRIPTIONS = gql`
  query GetUserSubscriptions {
    ${QUERY_NAME} {
    ...subscription
    }
  }
  ${SUBSCRIPTION_FRAGMENT}
`;

export const ActionContainer = styled.View`
  margin-top: ${scaleHeight(20) + 'px'};
`;
export const OffsetInstructionText = styled(Typography.Text).attrs({
  center: true,
  fontSize: 'h8',
  lineHeightRatio: 1.5,
  color: 'secondary',
})`
  margin-top: ${scaleHeight(10) + 'px'};
  max-width: 250px;
`;

export const OffsetButton = styled(Button).attrs({
  // isOutline: true,
  color: 'primary',
})`
  margin-top: ${scaleHeight(10) + 'px'};
  align-self: center;
  min-width: 180px;
`;

export const CancelButton = styled(Button.Clear).attrs({
  color: 'primary',
})`
  margin-top: ${scaleHeight(20) + 'px'};
  margin-bottom: ${scaleHeight(20) + 'px'};
`;

const screenTitle = 'ACTIVE OFFSETS';
const title = 'Your next subscription payment will be';
const info =
  'Please note that if you add more \nemissions your price will increase';

const ActiveSubscriptionScreen = ({ isActive }) => {
  const goTo = useOffsetNav();

  const { data, loading } = useQuery(GET_SUBSCRIPTIONS, {
    fetchPolicy: 'network-only',
  });

  const { id, billingDate, portfolio } = data?.[QUERY_NAME][0] || {};

  const isMinimumAmount = portfolio?.quote?.totalHabitAmount > 0.5;

  const showOffsetNow = isThisMonth(new Date(billingDate)) && isMinimumAmount;

  const Actions = (
    <ActionContainer>
      {showOffsetNow && (
        <>
          {/* <OffsetInstructionText>
            Your next payment will go off at the end of this month. Would you
            like to offset this now?
          </OffsetInstructionText>

          <OffsetButton
            onPressHandler={() =>
              goTo.cardDetails({ portfolioId: portfolio.id })
            }>
            {'Offset Now'}
          </OffsetButton> */}
        </>
      )}
      <CancelButton
        onPress={() => goTo.cancelSubscription({ subscriptionId: id })}>
        {'cancel auto offset'}
      </CancelButton>
    </ActionContainer>
  );
  return (
    <SubscriptionOverview
      screenTitle={screenTitle}
      isActive={isActive}
      title={title}
      info={info}
      portfolio={portfolio}
      billingDate={billingDate}
      loading={loading}
      Actions={Actions}
    />
  );
};

export default ActiveSubscriptionScreen;
