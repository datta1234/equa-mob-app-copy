import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/core';
import { pipe } from 'ramda';

import { ROOT_NAVIGATOR } from 'constants/routes';
import { prettyGraphQLErrors } from 'utils/formats';
import translator from 'utils/translator';

const QUERY_NAME = 'addFootprintActivity';

const ADD_FOOTPRINT_ACTIVITY = gql`
  mutation AddFootprintActivity($input: AddFootprintActivityInput!) {
    ${QUERY_NAME}(input: $input) {
      footprintActivity {
        id
      }
    }
  }
`;

export default (WrappedComponent) => {
  return ({ ...rest }) => {
    const navigation = useNavigation();

    const closeAndShowSUccessModal = () => {
      navigation.dangerouslyGetParent()?.goBack();

      setTimeout(() => {
        navigation.navigate(ROOT_NAVIGATOR.NAME, {
          screen: ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
          params: {
            type: 'success',
            title: translator.translate(
              'addFootPrintActivityScreen.activityAddedModal.title',
            ),
            subtitle: translator.translate(
              'addFootPrintActivityScreen.activityAddedModal.subtitle',
            ),
          },
        });
      }, 250);
    };

    const goToErrorNotificationScreen = ({ title, subtitle }) =>
      navigation.navigate(ROOT_NAVIGATOR.NAME, {
        screen: ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
        params: {
          type: 'failure',
          title,
          subtitle,
        },
      });

    const [addFootprintActivity] = useMutation(ADD_FOOTPRINT_ACTIVITY, {
      onCompleted: closeAndShowSUccessModal,
      onError: pipe(prettyGraphQLErrors, goToErrorNotificationScreen),
    });

    return (
      <WrappedComponent
        {...rest}
        addFootprintActivity={(input) =>
          addFootprintActivity({ variables: { input } })
        }
      />
    );
  };
};
