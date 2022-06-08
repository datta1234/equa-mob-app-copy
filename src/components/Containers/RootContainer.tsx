import React from 'react';

import { useQuery } from '@apollo/client';

import {
  GET_ACTIVE_USER_CREDIT,
  GET_ACTIVE_USER_CREDIT_QUERY_NAME,
} from 'api/operations/queries/getActiveUserCredit';
import {
  GET_SUBSCRIPTIONS_IMAGE_QUERY_NAME,
  GET_SUBSCRIPTION_IMAGE,
} from 'api/operations/queries/getSubscriptionImage';

import BaseContainer from './BaseContainer';

const RootContainer = ({ headerImageSource, children, ...baseProps }) => {
  const subscriptionsQueryResult = useQuery(GET_SUBSCRIPTION_IMAGE, {
    fetchPolicy: 'cache-and-network',
  });

  // TODO: remove hacky credit image fetch ... this will be returned by the subscription in the future
  const userCreditsQueryResult = useQuery(GET_ACTIVE_USER_CREDIT, {
    fetchPolicy: 'cache-and-network',
  });

  const creditHeaderImage = userCreditsQueryResult.data?.[
    GET_ACTIVE_USER_CREDIT_QUERY_NAME
  ]?.portfolio?.media?.find((img) => img?.typeCode === 'THUMBNAIL')?.url;

  const subscriptionImage = subscriptionsQueryResult.data?.[
    GET_SUBSCRIPTIONS_IMAGE_QUERY_NAME
  ]?.[0]?.portfolio?.media?.find((img) => img?.typeCode === 'THUMBNAIL')?.url;

  const subscriptionImageSource =
    subscriptionImage || creditHeaderImage
      ? { uri: subscriptionImage ?? creditHeaderImage }
      : null;

  return (
    <BaseContainer
      headerImageSource={headerImageSource ?? subscriptionImageSource}
      {...baseProps}>
      {children}
    </BaseContainer>
  );
};

export default RootContainer;
