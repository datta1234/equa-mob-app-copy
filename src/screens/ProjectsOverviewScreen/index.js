import React, { useRef } from 'react';

import { useNavigation } from '@react-navigation/core';
import { length } from 'ramda';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { Animated } from 'react-native';

import ProjectCards, {
  DefaultActionIcon as ProjectDefaultActionIcon,
} from 'components/ProjectCards';
import { ROOT_NAVIGATOR } from 'constants/routes';

import { withprojectsQuery, withProjectPortfolioMutation } from './hocs';
import {
  ContentContainer,
  StyledFlatList,
  PullTargetBar,
  Container,
  GoBackOverlay,
  PullTargetContainer,
} from './styles';

const propTypes = {};

const defaultProps = {};

const ProjectCard = withProjectPortfolioMutation(
  ({ project, actionHandler, isLoading, navToProjectModal }) => {
    return (
      <TouchableOpacity onPress={() => navToProjectModal(project)}>
        <ProjectCards.Item
          isHorizontal
          project={project}
          renderAction={() => (
            <TouchableOpacity onPress={actionHandler}>
              <ProjectDefaultActionIcon
                isSelected={project.isSelected}
                isLoading={isLoading}
              />
            </TouchableOpacity>
          )}
        />
      </TouchableOpacity>
    );
  },
);

function ProjectsOverviewScreen({ projects, fetchMore, isLoading }) {
  const offset = useRef(new Animated.Value(10)).current;

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const navToProjectDescriptionModal = (project) => {
    navigation.navigate(ROOT_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.SCREENS.PROJECT_DESCRIPTION_MODAL.NAME,
      params: {
        project,
        isAddedToPortfolio: project.selected,
      },
    });
  };

  const renderProjectCard = ({ item }) => (
    <ProjectCard
      project={item}
      key={item.id}
      navToProjectModal={navToProjectDescriptionModal}
    />
  );

  return (
    <Container>
      <GoBackOverlay onPress={goBack} />

      <ContentContainer>
        <PullTargetContainer>
          <PullTargetBar />
        </PullTargetContainer>

        <StyledFlatList
          data={projects}
          renderItem={renderProjectCard}
          extraData={length(projects)}
          ListFooterComponent={() =>
            isLoading && (
              <View style={{ padding: 25 }}>
                <ActivityIndicator />
              </View>
            )
          }
          onEndReached={fetchMore}
          onEndReachedTreshold={0.1}
          scrollEventThrottle={16}
          onScroll={(value) => {
            if (
              value.nativeEvent.contentOffset.y >= 1 &&
              value.nativeEvent.contentOffset.y <= 650
            ) {
              Animated.event(
                [{ nativeEvent: { contentOffset: { y: offset } } }],
                { useNativeDriver: false },
              )(value);
            }
          }}
        />
      </ContentContainer>
    </Container>
  );
}

ProjectsOverviewScreen.defaultProps = defaultProps;
ProjectsOverviewScreen.propTypes = propTypes;
export default withprojectsQuery(ProjectsOverviewScreen);
