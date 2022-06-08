import React from 'react';

import { View, StyleSheet } from 'react-native';

import { RootContainer as ScreenContainer } from 'components/Containers';
import { scale } from 'constants/layout';

import { CertificationStandards, SustainableGoals } from '../common';

import { ProjectHeader, ProjectImageCarousel, ProjectMap } from './components';
import {
  BodyInfo,
  BodyTitle,
  CategoryTitle,
} from './projectOverviewScreen.styles';

const screenTitle = 'PROJECT OVERVIEW';

const defaultProps = {};
export default function ProjectOverviewScreen({ project, category }) {
  const map = project?.media?.find((media) => media?.typeCode === 'MAP');
  const backImageUrl = project?.media?.find(
    (media) => media?.typeCode === 'THUMBNAIL',
  )?.url;

  const imageMedia = project?.media?.filter(
    (medium) => medium?.typeCode === 'IMAGE',
  );

  const { name, description, sustainableGoals, certificationStandards } =
    project || {};

  return (
    <ScreenContainer
      back
      headerImageSource={{ uri: backImageUrl }}
      // header={<ProjectHeader category={category} name={name} />}
      title={screenTitle}
      bodyColor={'secondary'}>
      <View style={s.bodyContainer}>
        <View style={s.contentContainer}>
          <CategoryTitle>{category}</CategoryTitle>
          <BodyTitle>{`${name}`}</BodyTitle>
          <BodyInfo>{description}</BodyInfo>
        </View>
        <ProjectImageCarousel imageMedia={imageMedia} />
        <SustainableGoals sustainableGoals={sustainableGoals} />
        <CertificationStandards
          certificationStandards={certificationStandards}
        />

        <View style={s.mapContainer}>
          <BodyTitle>Project Map</BodyTitle>
          <ProjectMap map={map} />
        </View>
      </View>
    </ScreenContainer>
  );
}
ProjectOverviewScreen.defaultProps = defaultProps;
export default ProjectOverviewScreen;

const s = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: scale(24),
    paddingTop: scale(10),
  },
  contentContainer: {
    marginHorizontal: scale(20),
    marginBottom: scale(12),
    marginTop: scale(18),
  },
  mapContainer: {
    marginHorizontal: scale(20),
    marginBottom: scale(12),
    marginTop: scale(5),
  },
});
