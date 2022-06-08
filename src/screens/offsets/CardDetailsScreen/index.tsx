import React, { useEffect, useState } from 'react';

import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { pipe } from 'ramda';

import {
  OffsetStackNavigationProp,
  OffsetStackRouteProp,
} from 'types/navigation';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';
import { isDefined } from 'utils/ramda';

import useOffsetNav from '../hooks/useOffsetNav';

import CardDetailsScreen from './CardDetailsScreen';
import SubscriptionController from './components/SubscriptionController';
import { PAYMENT_STATUS } from './constants';
import { encryptCardDetails } from './encryption';

type Props = {
  route: OffsetStackRouteProp<'CardDetailsScreen'>;
  navigation: OffsetStackNavigationProp<'CardDetailsScreen'>;
};

const GET_PAYMENT_ACCESS_QUERY_NAME = 'GetPaymentAccess';
const GET_PAYMENT_ACCESS = gql`
query GetPaymentAccess {
  ${GET_PAYMENT_ACCESS_QUERY_NAME} {
	reference
	key
	iv
      }
}
`;

const INIT_PAYMENT_MUTATION_NAME = 'InitiatePayment';
const INIT_PAYMENT = gql`
  mutation InitPayment($type: PaymentType!, $portfolioId: Int!, $metaData: String, $reference: String )  {
    ${INIT_PAYMENT_MUTATION_NAME}(
      input: {
	type: $type,
	portfolioId:$portfolioId,
	reference: $reference,
	metaData: $metaData,
      }
    ){
	paymentId
	status
  message
      }
  }
`;

const defaultProps = {};
const CardDetails = ({ route }: Props) => {
  const portfolioId = route?.params?.portfolioId;
  let isRefValid = false;

  const [cardDetails, setCardDetails] = useState({});
  const [canRunSubscription, setCanRunSubscription] = useState(false);

  const goTo = useOffsetNav();

  const goToNotificationScreen = (params) => {
    goTo.notificationScreen(params);
  };

  const [getPaymentAccess, paymentAccessRes] = useLazyQuery(
    GET_PAYMENT_ACCESS,
    {
      fetchPolicy: 'network-only',
      onCompleted: () => {
        isRefValid = true;
        setCanRunSubscription(true);
      },
      onError: runAfterInteractionHOF(
        pipe(prettyGraphQLErrors, goToNotificationScreen),
      ),
    },
  );

  const [initiatePayment, paymentResponse] = useMutation(INIT_PAYMENT, {
    variables: {
      type: 'AUTO_OFFSET',
    },
    onCompleted: (data) => {
      const { paymentId, status, message } = data?.[INIT_PAYMENT_MUTATION_NAME];
      if (status) {
        isRefValid = false;
        status === PAYMENT_STATUS.RESERVE_FAILED &&
          goTo.paymentNotification({ type: 'failed', body: message });
        if (status === PAYMENT_STATUS.RESERVE_ERROR) {
          goTo.paymentNotification({ type: 'failed', body: message });
        }
        status === PAYMENT_STATUS.RESERVE_SUCCESS &&
          goTo.paymentNotification({ type: 'success', body: message });
      }
    },
    onError: (errorData) => {
      isRefValid = false;
      setCanRunSubscription(false);
      const errors = prettyGraphQLErrors(errorData);
      goToNotificationScreen({ type: 'failure', ...errors });
    },
  });

  const paymentAccess =
    paymentAccessRes?.data?.[GET_PAYMENT_ACCESS_QUERY_NAME] || {};

  const runSubscription = !!paymentAccess?.reference && canRunSubscription;

  const handlePayment = ({ cardDetails, reference, key, iv }) => {
    const encrypted = encryptCardDetails(cardDetails, key, iv);
    initiatePayment({
      variables: {
        reference: reference,
        portfolioId: portfolioId,
        metaData: encrypted,
      },
    });
  };

  useEffect(() => {
    if (
      isDefined(cardDetails) &&
      isDefined(paymentAccess) &&
      !paymentAccessRes.loading &&
      isRefValid
    ) {
      //TODO: only initiate payment after subscribed
      handlePayment({ ...paymentAccess, cardDetails });
    }
  }, [paymentAccessRes, paymentAccess, cardDetails]);

  const setupPayment = (cardDetails) => {
    getPaymentAccess();
    setCardDetails(cardDetails);
  };

  return (
    <>
      {runSubscription && (
        <SubscriptionController reference={paymentAccess?.reference} />
      )}
      <CardDetailsScreen
        initiatePayment={setupPayment}
        loading={paymentResponse.loading || paymentAccessRes.loading}
      />
    </>
  );
};

CardDetails.defaultProps = defaultProps;
export default CardDetails;
