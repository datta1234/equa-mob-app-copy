import React from 'react';

import PropTypes from 'prop-types';
import { pipe } from 'ramda';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Typography } from 'components';
import { roundNumber } from 'utils/common';
import { isNotDefined, isDefined } from 'utils/ramda';

import withLayout from './hocs/withLayout';
import withSlider from './hocs/withSlider';
import CardDescription from './shared/CardDescriptionItem';
import {
  AddressMapIcon,
  MedalIcon,
  Container,
  ImageContainer,
  DescriptionContainer,
  ActionNodeContainer,
} from './styles';

const propTypes = {
  project: PropTypes.objectOf({
    thumbnailBackgroun: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

const defaultProps = {};

function ProjectCardItem({ isHorizontal, renderAction, project = {} }) {
  // console.log('project', project.thumbnailBackground);
  const renderType = () => (
    <Typography.Text size="small">{project.projectType}</Typography.Text>
  );
  const renderName = () => (
    <Typography type="h5" style={[isHorizontal && { marginRight: 25 }]}>
      {project.name}
    </Typography>
  );

  const _renderAction = () => {
    if (isNotDefined(renderAction)) {
      return null;
    }

    return renderAction();
  };

  return (
    <Container isHorizontal={isHorizontal}>
      <ActionNodeContainer>{_renderAction()}</ActionNodeContainer>
      <ImageContainer isHorizontal={isHorizontal}>
        <FastImage
          style={{ width: '100%', height: '100%' }}
          source={{
            uri: project.thumbnailBackground,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </ImageContainer>

      <DescriptionContainer isHorizontal={isHorizontal}>
        <View>{renderType()}</View>

        <View>{renderName()}</View>

        {isDefined(project.interest) && (
          <View style={{ marginTop: 5 }}>
            <Typography.Text size="small" type="success">
              {roundNumber(project.interest) + '%'}
            </Typography.Text>
          </View>
        )}

        <View style={{ marginTop: 15 }}>
          <CardDescription renderIcon={() => <AddressMapIcon />}>
            {project.location}
          </CardDescription>

          <CardDescription renderIcon={() => <MedalIcon />}>
            Standard name
          </CardDescription>
        </View>
      </DescriptionContainer>
    </Container>
  );
}

ProjectCardItem.defaultProps = defaultProps;
ProjectCardItem.propTypes = propTypes;
export default pipe(withSlider, withLayout)(ProjectCardItem);
