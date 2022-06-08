import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Icon } from 'components';
import { PORTFOLIO_NAVIGATOR } from 'constants/routes';

import {
  PressableContainer,
  ImageContainer,
  Image,
  CardDetailsContainer,
  ProjectName,
  Description,
  IconContainer,
} from './projectCard.styles';

const projectOverviewScreen = PORTFOLIO_NAVIGATOR.PROJECT_OVERVIEW_SCREEN.NAME;

const CardImage = ({ image, isHorizontal, width }) => {
  return (
    <ImageContainer width={width}>
      <Image uri={image?.url} />
    </ImageContainer>
  );
};

const CardDetails = ({ title, description, width }) => {
  return (
    <CardDetailsContainer>
      <ProjectName>{title}</ProjectName>
      {/* <DescriptionContainer> */}

      <Description>{description}</Description>
      {/* </DescriptionContainer> */}
    </CardDetailsContainer>
  );
};

function ProjectCard({ project }) {
  const { name, shortDescription, media } = project || {};

  const navigation = useNavigation();

  const goToProjectOverview = () =>
    navigation.navigate(projectOverviewScreen, {
      id: project?.projectId,
      category: project?.categoryName,
    });

  return (
    <PressableContainer onPress={goToProjectOverview}>
      <CardImage image={media?.[0]} />
      <CardDetails title={name} description={shortDescription} />
      <IconContainer>
        <Icon
          type="forward"
          color={'dark'}
          iconColor={'white'}
          size={30}
          onPress={goToProjectOverview}
        />
      </IconContainer>
    </PressableContainer>
  );
}

const propTypes = {};

const defaultProps = {};

ProjectCard.defaultProps = defaultProps;
ProjectCard.propTypes = propTypes;
export default ProjectCard;
