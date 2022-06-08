import React from 'react';

import { is } from 'ramda';

import { nodeType, renderNode } from 'utils/helpers';

import { Container, ButtonTitle, IconContainer } from './buttonContent.styles';

const ButtonContent = ({
  rightIcon,
  leftIcon,
  title,
  children,
  style,
  ...rest
}) => (
  <Container style={style}>
    <IconContainer isLeft={!!leftIcon}>{renderNode(leftIcon)}</IconContainer>
    {is(String, children) || title ? (
      <ButtonTitle center {...rest}>
        {title ?? children}
      </ButtonTitle>
    ) : (
      children
    )}
    <IconContainer isRight={!!rightIcon}>{renderNode(rightIcon)}</IconContainer>
  </Container>
);

const propTypes = {
  leftIcon: nodeType,
  rightIcon: nodeType,
};

const defaultProps = {};

ButtonContent.defaultProps = defaultProps;
ButtonContent.propTypes = propTypes;

export default ButtonContent;
