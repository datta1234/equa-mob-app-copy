import React, { useState } from 'react';

import { gql, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { PORTFOLIO_SUB_FRAGMENT } from 'api/fragments';
import Button from 'components/Button';
import { ClickableText } from 'components/Typography';
import { scaleHeight } from 'constants/layout';
import { ADD_ACTIVITY_NAVIGATOR, MAIN_NAVIGATOR } from 'constants/routes';
import useNotification from 'hooks/useNotification';

import useOffsetNav from '../hooks/useOffsetNav';

import Confirmation from './components/Confirmation';
import SubscriptionOverview from './components/SubscriptionOverview';
import TextList from './components/TextList';

const QUERY_NAME = 'GetPortfolios';

const GET_PORTFOLIO = gql`
  query GetSubscriptionPortfolio( $id: Int) {
    ${QUERY_NAME}(input:{id: $id}) {
      ...portfolio
    }
  }
  ${PORTFOLIO_SUB_FRAGMENT}
`;

export const ProceedButton = styled(Button).attrs({})`
  margin-top: ${scaleHeight(20) + 'px'};
  margin-bottom: ${20 + 'px'};
`;

export const CancelButton = styled(ClickableText).attrs({
  make: ['bold', 'underline'],
  size: 'small',
  mode: 'light',
  color: 'secondary',
  center: true,
  uppercase: true,
})``;

export const PaymentTermsContainer = styled.View``;

const screenTitle = 'OFFSET YOUR FOOTPRINT';
const disclaimerList = [
  { key: 1, value: 'Your first payment will be instant' },
  {
    key: 2,
    value:
      'Thereafter you will be charged at the end of every month based on your monthly emissions.',
  },
];

const PurchaseSubscriptionScreen = ({ portfolioId, isActive }) => {
  const showModal = useNotification();
  const navigation = useNavigation();
  const [areTermsAgreed, setAreTermsAgreed] = useState(false);
  const goTo = useOffsetNav();

  const { data, loading } = useQuery(GET_PORTFOLIO, {
    fetchPolicy: 'cache-and-network',
    variables: { id: portfolioId },
  });

  const portfolio = data?.[QUERY_NAME][0] || {};

  const isMinimumHabitAmount = portfolio?.quote?.totalHabitAmount > 0.5;
  const isMinimumTotalAmount = portfolio?.quote?.totalAmount > 0.5;

  const goToSelectionActivity = () =>
    navigation.navigate(MAIN_NAVIGATOR.NAME, {
      screen: ADD_ACTIVITY_NAVIGATOR.NAME,
      params: {
        screen: ADD_ACTIVITY_NAVIGATOR.SELECT_ACTIVITY_MODAL_SCREEN.NAME,
      },
    });

  function tryGoToPayment() {
    if (isMinimumTotalAmount) {
      goTo.cardDetails({ portfolioId: portfolio.id });
    } else {
      const message = isMinimumHabitAmount
        ? `Payment requires a total \namount greater than ${portfolio?.quote?.currency?.symbol}0.50. \n\nPlease add more emissions \nto proceed to payment.`
        : `Auto offset payments require a monthly emission amount greater than ${portfolio?.quote?.currency?.symbol}0.50. \n\nPlease add more monthly emissions \nto proceed to payment.`;
      showModal({
        type: 'warning',
        title: 'Minimum Payment Amount',
        subtitle: message,
        //TODO: uncomment the below when auto updating of queries/ cache is in
        // actionText: 'Add more emissions',
        // onActionPress: goToSelectionActivity,
      });
    }
  }

  const Actions = (
    <>
      <PaymentTermsContainer>
        <Confirmation
          goToAgreement={goTo.purchaseAgreement}
          areTermsAgreed={areTermsAgreed}
          setTermsAgreed={setAreTermsAgreed}
          portfolioId={portfolio.id}
        />

        <TextList list={disclaimerList} />
      </PaymentTermsContainer>

      <ProceedButton disabled={!areTermsAgreed} onPressHandler={tryGoToPayment}>
        {'Proceed to Payment'}
      </ProceedButton>
      <CancelButton onPress={goTo.autoOffset}>{'Cancel'}</CancelButton>
    </>
  );
  return (
    <SubscriptionOverview
      screenTitle={screenTitle}
      isActive={isActive}
      portfolio={portfolio}
      loading={loading}
      Actions={Actions}
    />
  );
};

export default PurchaseSubscriptionScreen;
