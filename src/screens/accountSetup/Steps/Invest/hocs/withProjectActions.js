import React, { useState } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import {
  all,
  append,
  head,
  ifElse,
  includes,
  map,
  objOf,
  of,
  partialRight,
  pipe,
  tap,
  without,
} from 'ramda';
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

    const [addProjectToPortfolio, addToPortfolioOptions] = useMutation(
      ADD_TO_PORTFOLIO,
      {
        onCompleted: pipe(
          getIn(ADD_TO_PORTFOLIO_MUTATION_NAME),
          console.log
          // addSelectedId,
          // tap(myProjectsQuery.refetch)
        ),
        onError: pipe(
          tap(console.log),
          getIn('graphQLErrors'),
          showExpectedErrorAlert
        ),
      }
    );

    const [removeProjectFromPortfolio, removePortfolioOptions] = useMutation(
      REMOVE_FROM_PORTFOLIO,
      {
        onCompleted: pipe(
          getIn(REMOVE_FROM_PORTFOLIO_MUTATION_NAME),
          console.log
          // tap(myProjectsQuery.refetch)
          // append,
          // setSelectedProjectsids
        ),
        onError: pipe(
          tap(console.log),
          getIn('graphQLErrors'),
          showExpectedErrorAlert
        ),
      }
    );

    const onAddProjectToPortfolio = pipe(
      getIn('id'),
      objOf('projectId'),
      objOf('variables'),
      addProjectToPortfolio
    );

    const onRemoveProjectFromPortfolio = pipe(
      getIn('id'),
      objOf('projectId'),
      objOf('variables'),
      removeProjectFromPortfolio
    );

    return (
      <WrappedComponent
        {...props}
        actionHandler={() =>
          ifElse(
            getIn('isSelected'),
            onRemoveProjectFromPortfolio,
            onAddProjectToPortfolio
          )(project)
        }
        isLoading={
          removePortfolioOptions.loading || addToPortfolioOptions.loading
        }
      />
    );
  };
};
