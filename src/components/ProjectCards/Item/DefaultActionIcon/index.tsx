import React from 'react';

import { ActivityIndicator } from 'react-native';

// import PropTypes from 'prop-types';

import { PlusIcon, CheckIcon, Container, LoaderContainer } from './styles';

const propTypes = {};

const defaultProps = {};

function ActionButton({ isSelected, isLoading }) {
  if (isLoading) {
    return (
      <LoaderContainer>
        <ActivityIndicator style={{ transform: [{ scale: 0.75 }] }} />
      </LoaderContainer>
    );
  }

  const renderIcon = () => {
    if (isSelected) {
      return <CheckIcon />;
    }

    return <PlusIcon />;
  };

  return <Container isSelected={isSelected}>{renderIcon()}</Container>;
}

ActionButton.defaultProps = defaultProps;
ActionButton.propTypes = propTypes;
export default ActionButton;
