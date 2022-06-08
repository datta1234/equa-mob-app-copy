import React from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import R, { pipe, tap } from 'ramda';

import { isLoggedInVar } from 'api/client/cache';
import { ClickableText } from 'components/Typography';
import { AUTH_NAVIGATOR } from 'constants/routes';
import authService from 'utils/auth';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';
import { useStatusNavigation } from 'utils/me';
import { getIn } from 'utils/ramda';

import { FIELDS } from '../constants';

const LOGIN_QUERY_NAME = 'Login';
const SIGN_IN_USER = gql`
  query SignInUser($${FIELDS.EMAIL.NAME}: String!, $${FIELDS.PASSWORD.NAME}: String!) {
    ${LOGIN_QUERY_NAME}(
      input: {
          emailAddress: $${FIELDS.EMAIL.NAME}
          password: $${FIELDS.PASSWORD.NAME}
        }
    ) {
      token { refreshToken accessToken }
      user { id firstName lastName emailAddress }
    }
  }
`;

const RESEND_QUERY_NAME = 'ResendVerificationEmail';
const RESEND_EMAIL = gql`
  query Resend($id: String!) {
    ${RESEND_QUERY_NAME}(input: { id: $id }) {
      success
    }
  }
`;

export default (WrappedComponent) => (props) => {
  const [_, navigateTo] = useStatusNavigation();
  const navigation = props?.navigation;

  const goToNotificationScreen = ({
    title,
    subtitle,
    type = 'failure',
    renderNode,
  }) =>
    navigation.navigate(AUTH_NAVIGATOR.NAME, {
      screen: AUTH_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
      params: {
        type,
        title,
        subtitle,
        renderNode,
      },
    });

  async function setCrashUserAttributes(user) {
    crashlytics().log('User signed in.');
    await Promise.all([
      crashlytics().setUserId(user?.id),
      crashlytics().setAttributes({
        email: user?.emailAddress,
        firstName: user?.firstName,
        lastName: user?.lastName,
      }),
    ]);
  }

  const [resendEmail] = useLazyQuery(RESEND_EMAIL, {
    onCompleted: () =>
      goToNotificationScreen({
        title: 'Success',
        subtitle: 'A verification email has been resent to your email!',
        type: 'success',
      }),
    fetchPolicy: 'no-cache',
    onError: pipe(
      //tap((v) => console.log('GQL_Error_Data', { v })),
      prettyGraphQLErrors,
      goToNotificationScreen,
    ),
  });

  const ResendEmailNode = (extensions) => {
    if (extensions?.code !== 'EMAIL_NOT_VERIFIED') {
      return;
    }

    return () => (
      <ClickableText
        make={['bold', 'underline']}
        size={'small'}
        mode={'dark'}
        center
        uppercase
        onPress={() => resendEmail({ variables: { id: extensions?.userId } })}>
        {'Resend Email'}
      </ClickableText>
    );
  };

  const onCompleted = pipe(
    tap(() => isLoggedInVar(true)),
    //tap((v) => console.log(v)),
    getIn(LOGIN_QUERY_NAME),
    tap(({ token }) => authService.storeTokens(token)),
    tap(async ({ user }) => await authService.setUserId(user?.id)),
    tap(async ({ user }) => await analytics().setUserId(user?.id)),
    tap(async () => await analytics().logLogin({ method: 'email' })),
    tap(({ user }) => setCrashUserAttributes(user)),
    runAfterInteractionHOF(navigateTo.home),
    tap(() => authService.setIsTourCompleted(true)),
  );

  const onError = pipe(
    tap(() => isLoggedInVar(false)),
    prettyGraphQLErrors,
    R.over(
      R.lens(R.prop('extensions'), R.assoc('renderNode')),
      ResendEmailNode,
    ),
    runAfterInteractionHOF(goToNotificationScreen),
  );

  const [signInUser, { loading }] = useLazyQuery(SIGN_IN_USER, {
    onCompleted,
    onError,
  });

  return (
    <WrappedComponent
      {...props}
      loading={loading}
      onSubmitHandler={signInUser}
      goToNotificationScreen={goToNotificationScreen}
    />
  );
};
