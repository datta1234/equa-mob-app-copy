import React from 'react';

import styled from 'styled-components/native';

import { Typography } from 'components';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { scaleHeight } from 'constants/layout';

import useForgotPassword from '../../hooks/useForgotPassword';

const ResendButton = styled(Typography.ClickableText).attrs({
  make: ['bold', 'underline'],
  center: true,
  size: 'small',
  text: 'Resend',
  color: 'primary',
})`
  margin-top: ${scaleHeight(10) + 'px'};
`;

export const Container = styled.View``;

export const Text = styled(Typography.Text).attrs({
  color: 'primary',
  fontSize: 'h6',
  center: true,
})`
  margin-top: ${scaleHeight(30) + 'px'};
`;

const QuestionAction = ({ onResend }) => (
  <Container>
    <Text>Didn't receive it?</Text>
    <ResendButton onPress={onResend} />
  </Container>
);

export default (WrappedComponent) => ({ goToNotificationScreen, ...props }) => {
  const [forgotPasswordReq, { loading, refetch }] = useForgotPassword({
    onCompleted: (data) => {
      goToNotificationScreen({
        type: 'success',
        title: 'Success',
        subtitle: data?.ForgotPassword?.message,
        renderNode: () => <QuestionAction onResend={() => refetch()} />, //TODO: Need to switch signIN HOCs around to get email from state for this, using refetch for now
      });
    },
  });

  return (
    <>
      <WrappedComponent
        {...props}
        submitForgotPassword={forgotPasswordReq}
        goToNotificationScreen={goToNotificationScreen}
      />
      {loading && <LoadingOverlay />}
    </>
  );
};
