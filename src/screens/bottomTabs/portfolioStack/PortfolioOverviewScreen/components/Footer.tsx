import React, { useCallback } from 'react';

import { useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  VERIFY_USER_CAN_OFFSET,
  VERIFY_USER_CAN_OFFSET_QUERY_NAME,
} from 'api/operations/queries/verifyUserCanOffset';
import { PORTFOLIO_NAVIGATOR } from 'constants/routes';
import useMainNav from 'hooks/navigation/useMainNav';
import { roundNumber } from 'utils/common';

import { Container, OffsetButton } from './footer.styles';
import { QuoteContainer, ValueDescription, Value } from './footer.styles';
import { MessageContainer, Text } from './footer.styles';
import { Col, CreditMessageContainer, DashboardButton } from './footer.styles';

const Quote = ({ quote }) => (
  <QuoteContainer>
    <ValueDescription>
      {'Based on your emissions for the current month'}
    </ValueDescription>
    <Value>{`${quote.totalKgCo2e.valueRounded}kgCO2e \n= ${
      quote.currency.symbol
    }${roundNumber(quote.totalAmount, 2).toFixed(2)}`}</Value>
  </QuoteContainer>
);

const comingSoonScreen = PORTFOLIO_NAVIGATOR.COMING_SOON_SCREEN.NAME;

const Message = ({ text }) => (
  <MessageContainer>
    <Text>{text}</Text>
  </MessageContainer>
);

const Footer = ({ portfolioId, quote }) => {
  const goTo = useMainNav();
  const insets = useSafeAreaInsets();

  const goToOffsets = () => {
    goTo.offsets({ selectedPortfolioId: portfolioId });
  };
  const goToDashboard = () => {
    goTo.dashboard(); // back to Bottom Tab navigator
  };

  const { data, loading, refetch } = useQuery(VERIFY_USER_CAN_OFFSET, {
    fetchPolicy: 'cache-and-network',
    variables: {},
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const { canOffset, hasHabit, hasCredit, hasSubscription, message } =
    data?.[VERIFY_USER_CAN_OFFSET_QUERY_NAME] || {};

  const renderContent = () => {
    if (hasCredit) {
      return (
        <Col>
          <CreditMessageContainer>
            <Text text={message} />
          </CreditMessageContainer>
          <DashboardButton
            onPressHandler={goToDashboard}
            title={'Return to Dashboard'}
          />
        </Col>
      );
    }

    if (canOffset || hasSubscription) {
      return (
        <OffsetButton
          onPressHandler={goToOffsets}
          title={hasSubscription ? 'Manage Offsets' : 'Reduce Footprint'}
        />
      );
    }

    return <Message text={message} />;
  };

  return (
    <Container insets={insets}>
      <Quote quote={quote} />
      {renderContent()}
    </Container>
  );
};

export default Footer;
