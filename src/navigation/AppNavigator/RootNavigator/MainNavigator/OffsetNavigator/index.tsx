import React from 'react';
// import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';

import { OFFSETS_NAVIGATOR } from 'constants/routes';
import {
  AutoOffsetScreen,
  SelectPortfolioScreen,
  SubscriptionOverviewScreen,
  PurchaseAgreementScreen,
  CardDetailsScreen,
  PaymentNotificationScreen,
  CancelSubscriptionScreen,
} from 'screens/offsets';
import { OffsetStackParamList } from 'types/navigation';

const OffsetStack = createStackNavigator<OffsetStackParamList>();

function OffsetNavigator() {
  return (
    <OffsetStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <OffsetStack.Screen
        name={OFFSETS_NAVIGATOR.AUTO_OFFSET_SCREEN.NAME}
        component={AutoOffsetScreen}
      />
      <OffsetStack.Screen
        name={OFFSETS_NAVIGATOR.SELECT_PORTFOLIO_SCREEN.NAME}
        component={SelectPortfolioScreen}
      />
      <OffsetStack.Screen
        name={OFFSETS_NAVIGATOR.SUBSCRIPTION_OVERVIEW_SCREEN.NAME}
        component={SubscriptionOverviewScreen}
      />
      <OffsetStack.Screen
        name={OFFSETS_NAVIGATOR.CONFIRM_SUBSCRIPTION_SCREEN.NAME}
        component={PurchaseAgreementScreen}
        options={{ gestureEnabled: false }}
      />
      <OffsetStack.Screen
        name={OFFSETS_NAVIGATOR.CARD_DETAILS_SCREEN.NAME}
        component={CardDetailsScreen}
      />
      <OffsetStack.Screen
        name={OFFSETS_NAVIGATOR.PAYMENT_NOTIFICATION_SCREEN.NAME}
        component={PaymentNotificationScreen}
      />
      <OffsetStack.Screen
        name={OFFSETS_NAVIGATOR.CANCEL_SUBSCRIPTION_SCREEN.NAME}
        component={CancelSubscriptionScreen}
      />
    </OffsetStack.Navigator>
  );
}

export default OffsetNavigator;
