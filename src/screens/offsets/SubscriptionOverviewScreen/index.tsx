import React from 'react';

import {
  OffsetStackNavigationProp,
  OffsetStackRouteProp,
} from 'types/navigation';

import ActiveSubscriptionScreen from './ActiveSubscriptionScreen';
import PurchaseSubscriptionScreen from './PurchaseSubscriptionScreen';

type Props = {
  route: OffsetStackRouteProp<'SubscriptionOverviewScreen'>;
  navigation: OffsetStackNavigationProp<'SubscriptionOverviewScreen'>;
};

const defaultProps = {};
const SubscriptionOverview = ({ route }: Props) => {
  const { portfolioId, isActive } = route?.params || {};

  return isActive ? (
    <ActiveSubscriptionScreen isActive={isActive} />
  ) : (
    <PurchaseSubscriptionScreen portfolioId={portfolioId} isActive={isActive} />
  );
};

SubscriptionOverview.defaultProps = defaultProps;
export default SubscriptionOverview;
