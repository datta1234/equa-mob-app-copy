import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { andThen, pick, pipe, tap } from 'ramda';

import { isLoggedInVar } from 'api/client/cache';
import { USER_FRAGMENT } from 'api/fragments';
import { AUTH_NAVIGATOR, SIGN_UP_NAVIGATOR } from 'constants/routes';
import authService from 'utils/auth';
import { prettyGraphQLErrors } from 'utils/formats';
import { getIn } from 'utils/ramda';

import { FIELDS } from '../constants';

const MUTATION_NAME = 'createUser';

const CREATE_USER = gql`
  mutation CreateUser($${FIELDS.MOBILE_NUMBER.NAME}: String!, $${FIELDS.CARBON_CREDIT_CODE.NAME}: String) {
    ${MUTATION_NAME}(
      input: {
        ${FIELDS.MOBILE_NUMBER.NAME}: $${FIELDS.MOBILE_NUMBER.NAME}
        ${FIELDS.CARBON_CREDIT_CODE.NAME}: $${FIELDS.CARBON_CREDIT_CODE.NAME}
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

    const goToNotificationScreen = ({ title, subtitle, type = 'failure' }) =>
      navigation.navigate(AUTH_NAVIGATOR.NAME, {
        screen: AUTH_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
        params: {
          type,
          title,
          subtitle,
        },
      });

    const goToVereficationScreen = () =>
      navigation.navigate(
        SIGN_UP_NAVIGATOR.SCREENS.MOBILE_VEREFICATION_FORM.NAME,
      );

    const onCompleted = pipe(
      tap(() => isLoggedInVar(true)),
      getIn(MUTATION_NAME),
      pick(['token']),
      authService.setData,
      andThen(goToVereficationScreen),
    );

    const [createUser] = useMutation(CREATE_USER, {
      onCompleted,
      onError: pipe(
        tap((v) => console.log('v', v)),
        tap(() => isLoggedInVar(false)),
        prettyGraphQLErrors,
        goToNotificationScreen,
      ),
    });

    return (
      <WrappedComponent
        {...props}
        onSubmitHandler={createUser}
        goToNotificationScreen={goToNotificationScreen}
      />
    );
  };
};
