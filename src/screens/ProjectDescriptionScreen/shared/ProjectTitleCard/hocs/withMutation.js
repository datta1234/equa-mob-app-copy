import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { mergeDeepLeft, pipe } from 'ramda';

import { getIn } from 'utils/ramda';

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
        usersCount
        members(count: 4) {
          id
          thumbnailAvatar(revision: "x40")
        }
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
        usersCount
        members(count: 4) {
          id
          thumbnailAvatar(revision: "x40")
        }
      }
    }
  }
`;

export default (WrappedComponent) => {
  return ({ ...rest }) => {
    const [project, setProject] = useState(rest.project);

    const [addProjectToPortfolio, addToPortfolioOptions] = useMutation(
      ADD_TO_PORTFOLIO,
      {
        onCompleted: pipe(
          getIn([ADD_TO_PORTFOLIO_MUTATION_NAME, 'project']),
          mergeDeepLeft,
          setProject
        ),
        onError: console.log,
      }
    );

    const [removeProjectFromPortfolio, removePortfolioOptions] = useMutation(
      REMOVE_FROM_PORTFOLIO,
      {
        onCompleted: pipe(
          getIn([REMOVE_FROM_PORTFOLIO_MUTATION_NAME, 'project']),
          mergeDeepLeft,
          setProject
        ),
        onError: console.log,
      }
    );

    return (
      <WrappedComponent
        {...rest}
        project={project}
        addProjectToPortfolio={(projectId) =>
          addProjectToPortfolio({
            variables: {
              projectId,
            },
          })
        }
        removeProjectFromPortfolio={(projectId) =>
          removeProjectFromPortfolio({
            variables: {
              projectId,
            },
          })
        }
        isLoading={
          removePortfolioOptions.loading || addToPortfolioOptions.loading
        }
      />
    );
  };
};
