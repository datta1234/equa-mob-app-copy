import React from 'react';

// import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

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
      <View>
        <ActivityIconContainer>{renderIcon()}</ActivityIconContainer>
      </View>

      <ActivityNameContainer>
        <ActivityName>{children}</ActivityName>
      </ActivityNameContainer>

      <View>
        <RightIcon />
      </View>
    </Container>
  );
}

ActivityItem.defaultProps = defaultProps;
ActivityItem.propTypes = propTypes;
export default ActivityItem;
