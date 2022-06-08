import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { pipe, tap } from 'ramda';

import { MY_PROJECT_MINIATURE } from 'api/fragments';
import { ACCOUNT_SETUP_NAVIGATOR, ROOT_NAVIGATOR } from 'constants/routes';
import { prettyGraphQLErrors } from 'utils/formats';
import { getIn } from 'utils/ramda';

const MUTATION_NAME = 'confirmSelectedProjects';

const CONFIRM_SELECTED_PROJECTS = gql`
  mutation ConfirmSelectedProjects {
    ${MUTATION_NAME}(input: { confirm: true }) {
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

    const goToAccountSetupAssignStep = () =>
      navigation.navigate(ACCOUNT_SETUP_NAVIGATOR.SCREENS.ASSIGN_STEP.NAME);

    const goToAccountSetupChooseProjectsStep = () =>
      navigation.navigate(
        ACCOUNT_SETUP_NAVIGATOR.SCREENS.CHOOSE_PROJECTS_STEP.NAME,
      );

    const openDisabledLoaderModal = () => {
      navigation.navigate(ROOT_NAVIGATOR.NAME, {
        screen: ROOT_NAVIGATOR.DISABLED_LOADER_MODAL_SCREEN.NAME,
      });
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

    const onCompleted = pipe(
      getIn(MUTATION_NAME),
      // tap(console.log),
      goToAccountSetupAssignStep,
    );

    const [confirmSelectedProjects] = useMutation(CONFIRM_SELECTED_PROJECTS, {
      onCompleted,
      onError: pipe(
        tap(goToAccountSetupChooseProjectsStep),
        prettyGraphQLErrors,
        goToErrorNotificationScreen,
      ),
    });

    return (
      <WrappedComponent
        {...props}
        onSubmitHandler={pipe(
          tap(openDisabledLoaderModal),
          // over(selectedProjectsIdsLens, map(parseInt)),
          confirmSelectedProjects,
        )}
      />
    );
  };
};
