import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { map, objOf, pipe, reject, tap } from 'ramda';

import { MY_PROJECT_MINIATURE } from 'api/fragments';
import { ROOT_NAVIGATOR } from 'constants/routes';
import { prettyGraphQLErrors } from 'utils/formats';
import { getIn, isNotDefined } from 'utils/ramda';

const MUTATION_NAME = 'massAddToPortfolio';

const MASS_ADD_TO_PORTFOLIO = gql`
  mutation MassAddToPortfolio($projectIds: [ID!]!) {
    ${MUTATION_NAME}(input: { projectIds: $projectIds }) {
      projects {
        id
        isSelected
      }
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation();

    // const goToAccountSetupAssignStep = () =>
    //   navigation.navigate(ACCOUNT_SETUP_NAVIGATOR.SCREENS.ASSIGN_STEP.NAME);

    // const goToAccountSetupChooseProjectsStep = () =>
    //   navigation.navigate(
    //     ACCOUNT_SETUP_NAVIGATOR.SCREENS.CHOOSE_PROJECTS_STEP.NAME
    //   );

    // const openDisabledLoaderModal = () => {
    //   navigation.navigate(ROOT_NAVIGATOR.NAME, {
    //     screen: ROOT_NAVIGATOR.DISABLED_LOADER_MODAL_SCREEN.NAME,
    //   });
    // };

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
      console.log,
    );

    const [massAddToPortfolio, massAddToPortfoliomutationOptions] = useMutation(
      MASS_ADD_TO_PORTFOLIO,
      {
        onCompleted,
        onError: pipe(prettyGraphQLErrors, goToErrorNotificationScreen),
      },
    );

    const unselectedProjectsIds = pipe(
      reject(getIn('isSelected')),
      map(getIn('id')),
    )(props.data);

    return (
      <WrappedComponent
        {...props}
        isAllSelected={isNotDefined(unselectedProjectsIds)}
        addAllProjects={() => {
          massAddToPortfolio({
            variables: {
              projectIds: unselectedProjectsIds,
            },
          });
        }}
        isLoading={massAddToPortfoliomutationOptions.loading}
      />
    );
  };
};
