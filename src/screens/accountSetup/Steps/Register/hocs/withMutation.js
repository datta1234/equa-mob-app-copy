import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { addMonths, format } from 'date-fns/fp';
import { always, ifElse, pipe, tap } from 'ramda';
import { Alert } from 'react-native';

import { USER_FRAGMENT } from 'api/fragments';
import { Button } from 'components';
import { ACCOUNT_SETUP_NAVIGATOR, ROOT_NAVIGATOR } from 'constants/routes';
import { prettyGraphQLErrors } from 'utils/formats';
import { getIn, isNotDefined } from 'utils/ramda';
import translator from 'utils/translator';

import { FIELDS } from '../constants';

const MUTATION_NAME = 'RegisterUser';

const REGISTER_USER = gql`
  mutation RegisterUser(
    $${FIELDS.FIRST_NAME.NAME}: String, 
    $${FIELDS.LAST_NAME.NAME}: String, 
    $${FIELDS.LOCATION.NAME}: String, 
    $${FIELDS.EMAIL.NAME}: String
    $${FIELDS.PASSWORD.NAME}: String
    $${FIELDS.PASSWORD_CONFIRMATION.NAME}: String
  ) {
    ${MUTATION_NAME}(
      input: { 
        attributes: {
          ${FIELDS.FIRST_NAME.NAME}: $${FIELDS.FIRST_NAME.NAME}
          ${FIELDS.LAST_NAME.NAME}: $${FIELDS.LAST_NAME.NAME}
          ${FIELDS.LOCATION.NAME}: $${FIELDS.LOCATION.NAME}
          ${FIELDS.EMAIL.NAME}: $${FIELDS.EMAIL.NAME}
          ${FIELDS.PASSWORD.NAME}: $${FIELDS.PASSWORD.NAME}
          ${FIELDS.PASSWORD_CONFIRMATION.NAME}: $${FIELDS.PASSWORD_CONFIRMATION.NAME}
        }
      }
    ) {
      user {
        ...userFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

export default (WrappedComponent) => {
  return ({ formParams, ...props }) => {
    const navigation = useNavigation();

    // fixme | delete this | only for demostration
    const [showNotificationAlert, setShowNotificationAlert] = useState(
      isNotDefined(props.me?.email),
    );

    const goToAccountSetupInvestStep = () =>
      navigation.navigate(
        ACCOUNT_SETUP_NAVIGATOR.SCREENS.CHOOSE_PROJECTS_STEP.NAME,
      );

    const goToAccountRegisterProjectsStep = () =>
      navigation.navigate(ACCOUNT_SETUP_NAVIGATOR.SCREENS.REGISTER_STEP.NAME);

    const openDisabledLoaderModal = () => {
      navigation.navigate(ROOT_NAVIGATOR.NAME, {
        screen: ROOT_NAVIGATOR.DISABLED_LOADER_MODAL_SCREEN.NAME,
      });
    };

    // const openDisabledLoaderModal = () => {
    //   navigation.navigate(ROOT_NAVIGATOR.NAME, {
    //     screen: ROOT_NAVIGATOR.DISABLED_LOADER_MODAL_SCREEN.NAME,
    //   });
    // };

    // fixme default alert for demonstration
    const mockPushNotificationsAlert = () =>
      Alert.alert(
        translator.translate(
          'setupAccount.steps.register.alerts.pushNotificationsNative.title',
        ),
        translator.translate(
          'setupAccount.steps.register.alerts.pushNotificationsNative.subtitle',
        ),
        [
          {
            text: translator.translate(
              'setupAccount.steps.register.alerts.pushNotificationsNative.buttons.cancel',
            ),
            onPress: goToAccountSetupInvestStep,
            style: 'cancel',
          },
          {
            text: translator.translate(
              'setupAccount.steps.register.alerts.pushNotificationsNative.buttons.allow',
            ),
            onPress: goToAccountSetupInvestStep,
          },
          ,
        ],
        { cancelable: false },
      );

    const goToErrorNotificationScreen = ({ title, subtitle }) =>
      navigation.navigate(ROOT_NAVIGATOR.NAME, {
        screen: ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
        params: {
          type: 'failure',
          title,
          subtitle,
        },
      });

    const goToNitificationScreen = () => {
      const dateToShow = pipe(addMonths(3), format('dd MMMM yyyy'))(new Date());

      setShowNotificationAlert(false);
      navigation.navigate(ROOT_NAVIGATOR.NAME, {
        screen: ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
        params: {
          type: 'warning',
          title: translator.translate(
            'setupAccount.steps.register.alerts.pushNotifications.title',
          ),
          subtitle: translator.translate(
            'setupAccount.steps.register.alerts.pushNotifications.subtitle',
            { dateToShow },
          ),
          renderNode: () => (
            <Button
              level={5}
              onPressHandler={mockPushNotificationsAlert}
              style={{ minWidth: 150 }}>
              {translator.translate(
                'setupAccount.steps.register.alerts.pushNotifications.buttons.submit',
              )}
            </Button>
          ),
        },
      });
    };

    const onCompleted = pipe(
      getIn(MUTATION_NAME),
      tap(goToAccountRegisterProjectsStep),
      ifElse(
        always(showNotificationAlert),
        goToNitificationScreen,
        goToAccountSetupInvestStep,
      ),
    );

    const [registerUser] = useMutation(REGISTER_USER, {
      onCompleted,
      onError: pipe(
        tap(goToAccountRegisterProjectsStep),
        prettyGraphQLErrors,
        goToErrorNotificationScreen,
      ),
    });

    return (
      <WrappedComponent
        {...props}
        onSubmitHandler={() => {
          openDisabledLoaderModal();
          registerUser({ variables: formParams });
        }}
      />
    );
  };
};
