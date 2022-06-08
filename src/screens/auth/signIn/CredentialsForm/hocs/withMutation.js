import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { partial, pick, pipe, tap } from 'ramda';

import { isLoggedInVar } from 'api/client/cache';
import { USER_FRAGMENT } from 'api/fragments';
import { AUTH_NAVIGATOR } from 'constants/routes';
import authService from 'utils/auth';
import { prettyGraphQLErrors } from 'utils/formats';
import { getIn } from 'utils/ramda';

import { FIELDS } from '../constants';

const MUTATION_NAME = 'signinUser';

const SIGN_IN_USER = gql`
  mutation SignInUser($${FIELDS.EMAIL.NAME}: String!, $${FIELDS.PASSWORD.NAME}: String) {
    ${MUTATION_NAME}(
      input: {
        credentials: {
          ${FIELDS.EMAIL.NAME}: $${FIELDS.EMAIL.NAME}
          ${FIELDS.PASSWORD.NAME}: $${FIELDS.PASSWORD.NAME}
        }
      }
    ) {
      user {
        ...userFragment
      }
      token
    }
  }
  ${USER_FRAGMENT}
`;

export default (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();

    const navToCodeCreditLoader = partial(navigation.navigate, [
      AUTH_NAVIGATOR.NAME,
      {
        screen: AUTH_NAVIGATOR.LOADER_MODAL_SCREEN.NAME,
      },
    ]);

    const goToNotificationScreen = ({ title, subtitle, type = 'failure' }) =>
      navigation.navigate(AUTH_NAVIGATOR.NAME, {
        screen: AUTH_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
        params: {
          type,
          title,
          subtitle,
        },
      });

    const onCompleted = pipe(
      // tap(console.log),
      tap(() => isLoggedInVar(true)),
      getIn(MUTATION_NAME),
      tap(navToCodeCreditLoader),
      pick(['token']),
      authService.setData,
    );

    const [signInUser] = useMutation(SIGN_IN_USER, {
      onCompleted,
      onError: pipe(prettyGraphQLErrors, goToNotificationScreen),
    });

    return (
      <WrappedComponent
        {...props}
        onSubmitHandler={signInUser}
        goToNotificationScreen={goToNotificationScreen}
      />
    );
  };
};
