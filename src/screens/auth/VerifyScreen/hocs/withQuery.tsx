import React from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { partial, pipe } from 'ramda';

import { AUTH_NAVIGATOR } from 'constants/routes';
import authService from 'utils/auth';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';
import { useStatusNavigation } from 'utils/me';

const REFRESH_TOKEN_QUERY_NAME = 'RefreshToken';
const EMAIL_CONFIRM = gql`
  query EmailConfirm($refreshToken: String!, $userId: String! ) {
    ${REFRESH_TOKEN_QUERY_NAME}(input: { refreshToken: $refreshToken, userId: $userId }) {
      token {
        refreshToken
        accessToken
      }
    }
  }
`;

const RESEND_QUERY_NAME = 'ResendVerificationEmail';
const RESEND_EMAIL = gql`
  query Resend($userId: String!) {
    ${RESEND_QUERY_NAME}(input: { id: $userId }) {
      success
    }
  }
`;

export default (WrappedComponent) => (props) => {
  const navigation = useNavigation();
  const [_, navigateTo] = useStatusNavigation();
  const { id, refreshToken } = props?.route?.params || {};

  const navToCodeCreditLoader = runAfterInteractionHOF(
    partial(navigation.navigate, [
      AUTH_NAVIGATOR.NAME,
      {
        screen: AUTH_NAVIGATOR.LOADER_MODAL_SCREEN.NAME,
        params: {
          onFinish: navigateTo.home,
        },
      },
    ]),
  );

  const goToNotificationScreen = ({ title, subtitle, type = 'failure' }) =>
    navigation.navigate(AUTH_NAVIGATOR.NAME, {
      screen: AUTH_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
      params: {
        type,
        title,
        subtitle,
      },
    });

  const onConfirmCompleted = (data) => {
    authService.storeTokens(data?.[REFRESH_TOKEN_QUERY_NAME]?.token);
    authService.setUserId(id);
    analytics().logEvent('user_verifies_email').catch(console.log);
    navToCodeCreditLoader();
  };

  const [emailConfirm, { loading }] = useLazyQuery(EMAIL_CONFIRM, {
    variables: { refreshToken, userId: id },
    fetchPolicy: 'network-only',
    onCompleted: onConfirmCompleted,
    onError: pipe(
      prettyGraphQLErrors,
      runAfterInteractionHOF(goToNotificationScreen),
    ),
  });
  const [resendEmail] = useLazyQuery(RESEND_EMAIL, {
    variables: { userId: id },
    onCompleted: () =>
      goToNotificationScreen({
        title: 'Success',
        subtitle: 'A verification email has been resent to your email!',
        type: 'success',
      }),
    fetchPolicy: 'no-cache',
    onError: pipe(prettyGraphQLErrors, goToNotificationScreen),
  });

  return (
    <WrappedComponent
      {...props}
      onSubmitHandler={emailConfirm}
      loading={loading}
      onResend={resendEmail}
    />
  );
};
