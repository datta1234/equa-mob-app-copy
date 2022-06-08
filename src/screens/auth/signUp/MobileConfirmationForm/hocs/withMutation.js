import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { partial, pipe } from 'ramda';

import {
  ACCOUNT_SETUP_NAVIGATOR,
  AUTH_NAVIGATOR,
  ROOT_NAVIGATOR,
} from 'constants/routes';
import { prettyGraphQLErrors } from 'utils/formats';
import { getIn } from 'utils/ramda';

import { FIELDS } from '../constants';

const MUTATION_NAME = 'smsConfirm';

const SMS_CONFIRM = gql`
  mutation SmsConfirm($${FIELDS.VEREFICATION_CODE.NAME}: String!) {
    ${MUTATION_NAME}(
      input: {
        ${FIELDS.VEREFICATION_CODE.NAME}: $${FIELDS.VEREFICATION_CODE.NAME}
      }
    ) {
      user {
        id
      }
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();

    const navToSetupAccount = () =>
      navigation.navigate(ROOT_NAVIGATOR.NAME, {
        screen: ACCOUNT_SETUP_NAVIGATOR.NAVIGATOR_NAME.NAME,
        params: {
          screen: ACCOUNT_SETUP_NAVIGATOR.NAVIGATOR_NAME.NAME,
          params: {
            screen: ACCOUNT_SETUP_NAVIGATOR.SCREENS.REGISTER_STEP.NAME,
          },
        },
      });

    const navToCodeCreditLoader = partial(navigation.navigate, [
      AUTH_NAVIGATOR.NAME,
      {
        screen: AUTH_NAVIGATOR.LOADER_MODAL_SCREEN.NAME,
        params: {
          onFinish: navToSetupAccount,
        },
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

    const [smsConfirm] = useMutation(SMS_CONFIRM, {
      onCompleted: pipe(getIn(MUTATION_NAME), navToCodeCreditLoader),
      onError: pipe(prettyGraphQLErrors, goToNotificationScreen),
    });

    return (
      <WrappedComponent
        {...props}
        onSubmitHandler={smsConfirm}
        goToNotificationScreen={goToNotificationScreen}
      />
    );
  };
};
