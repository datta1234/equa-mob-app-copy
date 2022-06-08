import React from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { always, anyPass, ifElse, map, times } from 'ramda';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { Typography } from 'components';
import ProjectCards, {
  DefaultActionIcon as ProjectDefaultActionIcon,
} from 'components/ProjectCards';
import { ROOT_NAVIGATOR } from 'constants/routes';
import { isNotDefined } from 'utils/ramda';
import translator from 'utils/translator';

import { ContentWrapper, SecondaryWrapper } from '../../../styles';
import { withProjectActions } from '../../hocs';

import Filter from './Filter';
import { withQuery } from './hocs';

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
          isHorizontal
          renderAction={() => (
            <TouchableOpacity onPress={() => actionHandler(project.id)}>
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
function IndividualyProjects({ isLoading, data, refetch }) {
  const navigation = useNavigation();

  const navToProjectDescriptionModal = (project) => {
    navigation.navigate(ROOT_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.SCREENS.PROJECT_DESCRIPTION_MODAL.NAME,
      params: {
        project,
        // onAddPotfolio: () => addOrRemoveProjectId(projectId),
        // onAddPotfolio: () => addOrRemoveProjectId(projectId),
      },
    });
  };

  const renderProjectCard = (project) => (
    <ProjectCard
      project={project}
      navToProjectModal={navToProjectDescriptionModal}
    />
  );
  const renderProjectCards = map(renderProjectCard);

  const renderProjectCardSkeleton = () => (
    <ProjectCards.SkeletonItem isHorizontal />
  );
  const renderProjectCardSkeletons = () => times(renderProjectCardSkeleton, 3);

  return (
    <SecondaryWrapper>
      <ContentWrapper>
        <Typography.Title level={2}>
          {translator.translate(
            'setupAccount.steps.invest.individualyProjects.title',
          )}
        </Typography.Title>
      </ContentWrapper>
      <Filter onChange={refetch} />

      <ContentWrapper withHorizontal={false}>
        <View style={{ paddingHorizontal: 15 }}>
          <ContentWrapper withHorizontal={false}>
            <ProjectCards>
              {ifElse(
                anyPass([always(isLoading), isNotDefined]),
                renderProjectCardSkeletons,
                renderProjectCards,
              )(data)}
            </ProjectCards>
          </ContentWrapper>
        </View>
      </ContentWrapper>
    </SecondaryWrapper>
  );
}

IndividualyProjects.defaultProps = defaultProps;
IndividualyProjects.propTypes = propTypes;
export default withQuery(IndividualyProjects);
