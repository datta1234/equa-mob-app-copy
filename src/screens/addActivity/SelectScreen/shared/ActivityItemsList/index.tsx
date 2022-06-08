import React from 'react';

import { length, map } from 'ramda';
import { TouchableOpacity, Animated } from 'react-native';

// import PropTypes from 'prop-types';

import ActivityItem from '../ActivityItem';

import { Container } from './styles';

const propTypes = {};

const defaultProps = {};

function ActivityItemsList({ options }) {
  const renderActivityItem = ({ onPress, title, key, ...itemProps }) => (
    <TouchableOpacity
      onPress={onPress}
      key={key}
      disabled={itemProps.isDisabled}
      activeOpacity={0.5}>
      <ActivityItem {...itemProps}>{title}</ActivityItem>
    </TouchableOpacity>
  );

  const renderActivityItems = map(renderActivityItem);

  return <Container>{renderActivityItems(options)}</Container>;
}

ActivityItemsList.defaultProps = defaultProps;
ActivityItemsList.propTypes = propTypes;
export default ActivityItemsList;
