import React from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { always, ifElse, map, pipe, times } from 'ramda';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';

import { Typography } from 'components';
import ProjectCards, {
  DefaultActionIcon as ProjectDefaultActionIcon,
} from 'components/ProjectCards';
import { ROOT_NAVIGATOR } from 'constants/routes';
import { isDefined, getIn } from 'utils/ramda';
import translator from 'utils/translator';

import {
  SecondaryWrapper,
  ContentWrapper,
  ContentItemWrapper,
  ContentRowWrapper,
  HorizontalScrollContainer,
} from '../../../styles';
import { withProjectActions } from '../../hocs';

import { withQuery, withAddAllMutation } from './hocs';
import { LoaderContainer } from './styles';

const propTypes = {};

const defaultProps = {};

const ProjectCard = withProjectActions(
  ({ project, navToProjectModal, actionHandler, isLoading }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        key={project.id}
        onPress={() => navToProjectModal(project)}>
        <ProjectCards.Item
          renderAction={() => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                actionHandler(project);
              }}>
              <ProjectDefaultActionIcon
                isSelected={project.isSelected}
                isLoading={isLoading}
              />
            </TouchableOpacity>
          )}
          project={project}
        />
      </TouchableOpacity>
    );
  },
);

function RecomendedProjects({
  data,
  addAllProjects,
  isAllSelected,
  isLoading,
  partner,
}) {
  const navigation = useNavigation();

  const navToProjectDescriptionModal = (project) => {
    navigation.navigate(ROOT_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.SCREENS.PROJECT_DESCRIPTION_MODAL.NAME,
      params: {
        project,
        // onAddPotfolio: () => addOrRemoveProjectId(projectId),
        // onAddPotfolio: () => addOrRemoveProjectId(projectId),
        // isAddedToPortfolio: project.isSelected,
      },
    });
  };

  // fixme | rework to flatlist
  const renderProjectCard = (project) => (
    <ProjectCard
      project={project}
      navToProjectModal={navToProjectDescriptionModal}
    />
  );

  const renderProjectCards = map(renderProjectCard);

  const renderProjectCardSkeleton = () => <ProjectCards.SkeletonItem />;
  const renderProjectCardSkeletons = () => times(renderProjectCardSkeleton, 3);

  // const addAllProjects = () => pipe(map(getIn('id')), addProjectsIds)(data);

  const renderSelectedAllNode = () => {
    if (isAllSelected) {
      return (
        <Typography.Text>
          {translator.translate(
            'setupAccount.steps.invest.recomendedProjects.allSelected',
          )}
        </Typography.Text>
      );
    }

    return (
      <TouchableOpacity onPress={addAllProjects}>
        <Typography.Title level={4}>{`+ ${translator.translate(
          'setupAccount.steps.invest.recomendedProjects.addAll',
        )}`}</Typography.Title>
      </TouchableOpacity>
    );
  };

  return (
    <SecondaryWrapper>
      <ContentWrapper>
        <ContentRowWrapper>
          {partner && (
            <Typography.Title level={2}>
              {translator.translate(
                'setupAccount.steps.invest.recomendedProjects.title',
                { businessName: partner.businessName },
              )}
            </Typography.Title>
          )}

          {renderSelectedAllNode()}
        </ContentRowWrapper>
      </ContentWrapper>

      <ContentItemWrapper style={{ marginTop: 0 }}>
        <HorizontalScrollContainer>
          <ProjectCards isHorizontal>
            {ifElse(
              isDefined,
              renderProjectCards,
              renderProjectCardSkeletons,
            )(data)}
          </ProjectCards>
          <ProjectCards isHorizontal>
            {/* {times(renderProjectCardSkeleton, 10)} */}
          </ProjectCards>
        </HorizontalScrollContainer>
      </ContentItemWrapper>

      {isLoading && (
        <LoaderContainer>
          <ActivityIndicator />
        </LoaderContainer>
      )}
    </SecondaryWrapper>
  );
}

RecomendedProjects.defaultProps = defaultProps;
RecomendedProjects.propTypes = propTypes;
export default pipe(withAddAllMutation, withQuery)(RecomendedProjects);
