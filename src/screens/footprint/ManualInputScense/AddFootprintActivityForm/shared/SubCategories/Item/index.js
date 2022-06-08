import React from 'react';

import PropTypes from 'prop-types';

import { withFadeIn } from 'hocs/withFadeIn';

import { Container, Nametext, IconContainer, CheckIcon } from './styles';

const propTypes = {
  showIcon: PropTypes.bool,
};

const defaultProps = {
  showIcon: true,
};

function SubCateoryItem({ children, isActive, showIcon }) {
  return (
    <Container isActive={isActive}>
      {showIcon && <IconContainer>{isActive && <CheckIcon />}</IconContainer>}
      <Nametext>{children}</Nametext>
    </Container>
  );
}

SubCateoryItem.defaultProps = defaultProps;
SubCateoryItem.propTypes = propTypes;
export default withFadeIn(
  {
    animationConfig: {
      duration: 250,
      initialValue: 0,
      useNativeDriver: true,
    },
  },
  SubCateoryItem
);
