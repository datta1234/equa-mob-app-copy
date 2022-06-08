import React from 'react';

// import PropTypes from 'prop-types';
import { View } from 'react-native';

import {
  ActivityName,
  RightIcon,
  ActivityIconContainer,
  Container,
  ActivityNameContainer,
} from './styles';

const propTypes = {};

const defaultProps = {};

function ActivityItem({ children, renderIcon, isDisabled }) {
  return (
    <Container isDisabled={isDisabled}>
      <ActivityIconContainer>{renderIcon()}</ActivityIconContainer>

      <ActivityNameContainer>
        <ActivityName>{children}</ActivityName>
      </ActivityNameContainer>

      <RightIcon />
    </Container>
  );
}

ActivityItem.defaultProps = defaultProps;
ActivityItem.propTypes = propTypes;
export default ActivityItem;
