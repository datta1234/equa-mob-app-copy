import React from 'react';

import { gql, useMutation } from '@apollo/client';
import { always, head, ifElse, objOf, pipe, tap } from 'ramda';
import { Alert } from 'react-native';

import { getIn, fork } from 'utils/ramda';

const ADD_TO_PORTFOLIO_MUTATION_NAME = 'addToPortfolio';
const REMOVE_FROM_PORTFOLIO_MUTATION_NAME = 'removeFromPortfolio';

const ADD_TO_PORTFOLIO = gql`
  mutation AddToPortfolio($projectId: ID!) {
    ${ADD_TO_PORTFOLIO_MUTATION_NAME}(
      input: {
        projectId: $projectId
      }
    ) {
      project {
        id
        isSelected
      }
    }
  }
`;

const REMOVE_FROM_PORTFOLIO = gql`
  mutation RemoveFromPortfolio($projectId: ID!) {
    ${REMOVE_FROM_PORTFOLIO_MUTATION_NAME}(
      input: {
        projectId: $projectId
      }
    ) {
      project {
        id
        isSelected
      }
    }
  }
`;

const showExpectedErrorAlert = pipe(
  head,
  fork(Alert.alert, getIn('message'), pipe(getIn('extensions'), JSON.stringify))
);

export default (WrappedComponent) => {
  return (props) => {
    const { project } = props;

    const [addProjectToPortfolio] = useMutation(ADD_TO_PORTFOLIO, {
      variables: {
        projectId: project.id,
      },
      onCompleted: pipe(getIn(ADD_TO_PORTFOLIO_MUTATION_NAME), console.log),
      onError: pipe(
        tap(console.log),
        getIn('graphQLErrors'),
        showExpectedErrorAlert
      ),
    });

    const [removeProjectFromPortfolio] = useMutation(REMOVE_FROM_PORTFOLIO, {
      variables: {
        projectId: project.id,
      },
      onCompleted: pipe(
        getIn(REMOVE_FROM_PORTFOLIO_MUTATION_NAME),
        console.log
      ),
      onError: pipe(
        tap(console.log),
        getIn('graphQLErrors'),
        showExpectedErrorAlert
      ),
    });

    return (
      <WrappedComponent
        {...props}
        actionHandler={pipe(
          getIn('id'),
          objOf('projectId'),
          objOf('variables'),
          ifElse(
            always(project.isSelected),
            removeProjectFromPortfolio,
            addProjectToPortfolio
          )
        )}
      />
    );
  };
};
