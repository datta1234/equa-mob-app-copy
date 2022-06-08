import React from 'react';

import { gql, useMutation } from '@apollo/client';
import analytics from '@react-native-firebase/analytics';
import { useNavigation } from '@react-navigation/native';
import { prop, pipe, tap } from 'ramda';

import { isLoggedInVar } from 'api/client/cache';
import { AUTH_NAVIGATOR } from 'constants/routes';
import authService from 'utils/auth';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';
import { getIn } from 'utils/ramda';

import { FIELDS } from '../constants';

const MUTATION_NAME = 'RegisterUser';

const REGISTER_USER = gql`
  mutation SignUp($${FIELDS.FIRST_NAME.NAME}: String!, $${FIELDS.LAST_NAME.NAME}: String!, $${FIELDS.EMAIL.NAME}: String!, $${FIELDS.PASSWORD.NAME}: String!, $${FIELDS.REGION_ID.NAME}: Int,  $${FIELDS.VOUCHER_CODE.NAME}: String, $trackAppActivities: Boolean!) {
    ${MUTATION_NAME}(
      input: {
        firstName: $${FIELDS.FIRST_NAME.NAME}
        lastName: $${FIELDS.LAST_NAME.NAME}
        emailAddress: $${FIELDS.EMAIL.NAME}
        password: $${FIELDS.PASSWORD.NAME}
        regionId: $${FIELDS.REGION_ID.NAME}
        voucherCode: $${FIELDS.VOUCHER_CODE.NAME},
        trackAppActivities: $trackAppActivities
      }
    ) {
      id
      refreshToken
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();

    const goToNotificationScreen = runAfterInteractionHOF(
      ({
        title,
        subtitle,
        type = 'failure',
        cancel = false,
        dismiss = false,
      }) =>
        navigation.navigate(AUTH_NAVIGATOR.NAME, {
          screen: AUTH_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
          params: {
            type,
            title,
            subtitle,
            cancel,
            dismiss,
          },
        }),
    );

    const goToVerificationScreen = runAfterInteractionHOF((params) =>
      navigation.navigate(AUTH_NAVIGATOR.VERIFY_SCREEN.NAME, {
        ...params,
      }),
    );

    const onCompleted = pipe(
      tap(() => isLoggedInVar(true)), //TODO: Move this to verification of email
      //tap((v) => console.log('data', v)),
      getIn(MUTATION_NAME),
      tap(goToVerificationScreen),
      tap(async () => await analytics().logSignUp({ method: 'email' })),
      prop('refreshToken'),
      authService.setRefreshToken,
      tap(() => authService.setIsTourCompleted(true)),
    );

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
      onCompleted,
      onError: pipe(
        //tap((v) => console.log('GQL_Error_Data', v)),
        tap(() => isLoggedInVar(false)),
        prettyGraphQLErrors,
        goToNotificationScreen,
      ),
    });

    return (
      <WrappedComponent
        {...props}
        onSubmitHandler={registerUser}
        loading={loading}
      />
    );
  };
};
