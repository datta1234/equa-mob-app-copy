import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import CheckIcon from 'assets/svgs/offsets/CheckIcon';
import { pipe } from 'ramda';
import styled from 'styled-components/native';

import {
  CANCEL_USER_SUBSCRIPTION_MUTATION_NAME,
  CANCEL_USER_SUBSCRIPTION,
} from 'api/operations/mutations/cancelUserSubscription';
import { GET_SUBSCRIPTION_IMAGE } from 'api/operations/queries/getSubscriptionImage';
import Button from 'components/Button';
import { scaleHeight } from 'constants/layout';
import {
  OffsetStackNavigationProp,
  OffsetStackRouteProp,
} from 'types/navigation';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';

import useOffsetNav from '../hooks/useOffsetNav';

import InfoContainer from './components/InfoContainer';

type Props = {
  route: OffsetStackRouteProp<'CancelSubscriptionScreen'>;
  navigation: OffsetStackNavigationProp<'CancelSubscriptionScreen'>;
};

export const AgreeButton = styled(Button).attrs({})`
  margin-top: ${scaleHeight(24) + 'px'};
  margin-bottom: ${scaleHeight(20) + 'px'};
`;
export const KeepPlanButton = styled(AgreeButton).attrs({
  isOutline: true,
  color: 'secondaryOutlined',
  textColor: 'primary',
})``;

export const CancelButton = styled(Button).attrs({
  // textColor: 'accent',
  color: 'warning',
  // isOutline: true,
})``;
export const ButtonsContainer = styled.View`
  width: 240px;
`;

const screenTitle = 'ACTIVE OFFSETS';

const defaultProps = {};
const CancelSubscriptionScreen = ({ route }: Props) => {
  const { subscriptionId } = route?.params;
  const goTo = useOffsetNav();
  const [current, setCurrent] = useState('cancel');

  const onCompleted = runAfterInteractionHOF((data) => {
    const { success } = data?.[CANCEL_USER_SUBSCRIPTION_MUTATION_NAME];
    if (success) {
      setCurrent('success');
    } else {
      setCurrent('failed');
    }
  });

  const [cancelSubscription, { loading }] = useMutation(
    CANCEL_USER_SUBSCRIPTION,
    {
      variables: { subscriptionId: subscriptionId },
      onCompleted: onCompleted,
      refetchQueries: [
        { query: GET_SUBSCRIPTION_IMAGE }, // update header image by re-fetching subscription. Can also use the query name ('GetUserSubscriptions') but make sure your query names are unique.
      ],
      onError: pipe(
        //tap((v) => console.log('GQL_Error_Data', v)),
        prettyGraphQLErrors,
        goTo.notificationScreen,
      ),
    },
  );

  const cancelScreenProps = {
    title: 'Are you sure you want \nto cancel your auto \noffset subscription?',
    bodyText:
      'This means that you will no longer be carbon neutral every month. \n\nYour bank details will be removed from Stripe.',
    footer: (
      <ButtonsContainer>
        <CancelButton isLoading={loading} onPressHandler={cancelSubscription}>
          {'Cancel Subscription'}
        </CancelButton>
        <KeepPlanButton onPressHandler={goTo.back}>
          {'Keep Plan'}
        </KeepPlanButton>
      </ButtonsContainer>
    ),
  };

  const successScreenProps = {
    title: 'Your auto-offset subscription was successfully cancelled.',
    bodyText:
      'You are only able to receive a refund within 24 hours of purchasing your auto-offset subscription. \n\nIn order to retrieve your refund, please continue to the dashboard and delete the emissions associated with your auto-offset subscription. ',
    footer: (
      <>
        <AgreeButton onPressHandler={goTo.dashboard}>
          {'Back to Dashboard'}
        </AgreeButton>
      </>
    ),
  };
  const failedScreenProps = {
    title: 'Your auto-offset subscription was not able to be cancelled! ',
    footer: (
      <>
        <AgreeButton onPressHandler={goTo.dashboard}>
          {'Back to Dashboard'}
        </AgreeButton>
      </>
    ),
  };

  const currentScreenProps =
    current === 'cancel'
      ? cancelScreenProps
      : current === 'success'
      ? successScreenProps
      : failedScreenProps;

  return (
    <InfoContainer
      center
      screenTitle={screenTitle}
      icon={<CheckIcon />}
      {...currentScreenProps}
    />
  );
};

CancelSubscriptionScreen.defaultProps = defaultProps;
export default CancelSubscriptionScreen;
