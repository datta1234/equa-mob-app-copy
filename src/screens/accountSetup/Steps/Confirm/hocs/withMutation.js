import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { assoc, objOf, pipe, tap } from 'ramda';

import { USER_FRAGMENT } from 'api/fragments';
import { ROOT_NAVIGATOR } from 'constants/routes';
import { prettyGraphQLErrors } from 'utils/formats';
import { useStatusNavigation } from 'utils/me';
import { getIn } from 'utils/ramda';

import { FIELDS } from '../constants';

const MUTATION_NAME = 'confirmUser';

const CONFIRM_USER = gql`
  mutation ConfirmUser($confirm: Boolean!) {
    ${MUTATION_NAME}(
      input: {
        confirm: $confirm
      }
    ) {
      user {
        ...userFragment
        state
      }
    }
  }
  ${USER_FRAGMENT}
`;

export default (WrappedComponent) => {
  return (props) => {
    const [navToByStatus] = useStatusNavigation();

    const navigation = useNavigation();

    const openDisabledLoaderModal = () => {
      navigation.navigate(ROOT_NAVIGATOR.NAME, {
        screen: ROOT_NAVIGATOR.DISABLED_LOADER_MODAL_SCREEN.NAME,
      });
    };

    const onCompleted = pipe(
      getIn([MUTATION_NAME, 'user']),
      navToByStatus,
      // tap(console.log),
      // goToAccountConfirmStep
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

    const [confirmUser] = useMutation(CONFIRM_USER, {
      onCompleted,
      onError: pipe(prettyGraphQLErrors, goToErrorNotificationScreen),
    });

    return (
      <WrappedComponent
        {...props}
        // onSubmitHandler={() => {
        //   navToByStatus();
        //   goToGroupNotificationScreen();
        // }}
        onSubmitHandler={() =>
          pipe(
            assoc(FIELDS.CONFIRM.NAME, true),
            // objOf('data'),
            objOf('variables'),
            tap(openDisabledLoaderModal),
            confirmUser,
          )({})
        }
      />
    );
  };
};
