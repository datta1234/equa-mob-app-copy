import React from 'react';

import PropTypes from 'prop-types';

import { withFadeIn } from 'hocs/withFadeIn';

import { TagContainer, TagText, IconContainer, CheckIcon } from './styles';

const propTypes = {
  showIcon: PropTypes.bool,
};

const defaultProps = {};

function SubCategoryItem({ children, isSelected, isActive, showIcon }) {
  return (
    <TagContainer isActive={isActive} isSelected={isSelected}>
      {showIcon && isSelected && (
        <IconContainer>{isSelected && <CheckIcon />}</IconContainer>
      )}
      <TagText isSelected={isSelected}>{children}</TagText>
    </TagContainer>
  );
}

SubCategoryItem.defaultProps = defaultProps;
SubCategoryItem.propTypes = propTypes;
export default withFadeIn(
  {
    animationConfig: {
      duration: 250,
      initialValue: 0,
      useNativeDriver: true,
    },
  },
  SubCategoryItem
);
