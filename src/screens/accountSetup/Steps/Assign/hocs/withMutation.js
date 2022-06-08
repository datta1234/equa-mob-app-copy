import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { objOf, pipe, tap } from 'ramda';

import { MY_PROJECT_MINIATURE } from 'api/fragments';
import { ROOT_NAVIGATOR, ACCOUNT_SETUP_NAVIGATOR } from 'constants/routes';
import { prettyGraphQLErrors } from 'utils/formats';
import { getIn } from 'utils/ramda';

const MUTATION_NAME = 'setProjectsInterest';

const SET_PROJECTS_INTERESED = gql`
  mutation SetProjectsInterest($data: [ProjectInterestAttributes!]!) {
    ${MUTATION_NAME}(
      input: {
        attributes: $data
      }
    ) {
      myProjects {
        ...myProjectMiniatureFragment
      }
    }
  }
  ${MY_PROJECT_MINIATURE}
`;

export default (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();

    const goToAccountConfirmStep = () =>
      navigation.navigate(ACCOUNT_SETUP_NAVIGATOR.SCREENS.CONFIRM_STEP.NAME);

    const openDisabledLoaderModal = () => {
      navigation.navigate(ROOT_NAVIGATOR.NAME, {
        screen: ROOT_NAVIGATOR.DISABLED_LOADER_MODAL_SCREEN.NAME,
      });
    };

    const onCompleted = pipe(
      getIn(MUTATION_NAME),
      // tap(console.log),
      goToAccountConfirmStep,
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

    const [setProjectsInterest] = useMutation(SET_PROJECTS_INTERESED, {
      onCompleted,
      onError: pipe(prettyGraphQLErrors, goToErrorNotificationScreen),
    });

    return (
      <WrappedComponent
        {...props}
        onSubmitHandler={pipe(
          // tap(console.log),
          objOf('data'),
          objOf('variables'),
          tap(openDisabledLoaderModal),
          setProjectsInterest,
        )}
      />
    );
  };
};
