import React from 'react';

import { gql, useSubscription } from '@apollo/client';
import useOffsetNav from 'screens/offsets/hooks/useOffsetNav';

import { LoadingOverlay } from 'components/LoadingOverlay';
import { prettyGraphQLErrors } from 'utils/formats';

import { SUBSCRIPTION_STATUS } from '../constants';

import AuthorizationWebView from './AuthorizationWebView';

// See: https://github.com/apollographql/apollo-client/issues/8677 for issue with Subscription_name being different to BE DTO response
const SUBSCRIPTION_NAME = 'GetPaymentStatus';
const GET_PAYMENT_STATUS = gql`
subscription GetPaymentStatus($reference: String!) {
	${SUBSCRIPTION_NAME}(input: { reference: $reference }) {
	  paymentId
	  status
	  authorizeUrl
	  message
	}
      }
`;

const SubscriptionController = ({ reference }) => {
  const goTo = useOffsetNav();
  // const [showWebView, setShowWebView] = useState(false);

  // const closeWebView = () => {
  //   setShowWebView(false);
  // };
  // const openWebView = () => {
  //   setShowWebView(true);
  // };

  const goToNotificationScreen = (params) => {
    goTo.notificationScreen(params);
  };

  const { data, loading } = useSubscription(GET_PAYMENT_STATUS, {
    variables: { reference },
    onCompleted: (onCompletedData) => {},
    onError: (errorData) => {
      const errors = prettyGraphQLErrors(errorData);
      goToNotificationScreen(errors);
    },
  });

  const { status, paymentId, authorizeUrl, message } =
    data?.getPaymentStatus || {};

  // console.log('Subscription:', data, 'loading', loading);

  if (!data || loading) {
    return <LoadingOverlay type={'material'} />;
  }

  // if (authorizeUrl && !showWebView) {
  //   openWebView();
  // }

  if (status.includes('ERROR')) {
    console.log('status:', status); //TODO: add this to crashlytics
    goTo.paymentNotification({ type: 'failed', body: message });
    // goTo.notificationScreen({
    //   type: 'failure',
    //   title: message,
    // });
  }
  if (status.includes('FAILED')) {
    console.log('status:', status); //TODO: add this to crashlytics
    goTo.paymentNotification({ type: 'failed', body: message });
  }

  if (status === SUBSCRIPTION_STATUS.SUCCESS) {
    goTo.paymentNotification({ type: 'success', body: message });
  }
  return (
    <AuthorizationWebView
      status={status}
      authorizeUrl={authorizeUrl}
      // closeWebView={closeWebView}
    />
  );
};

export default SubscriptionController;
