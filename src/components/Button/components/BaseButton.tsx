import React from 'react';

import { Container } from './baseButton.styles';
import { ButtonContent, ButtonContainer, LoadingIndicator } from './common';

const BaseButton = ({
  isLoading,
  style, // styles passed in by styled(Button)
  showIndicator = true,
  loadingColor,
  rightIcon,
  leftIcon,
  title,
  children,
  color,
  textColor,
  isOutline,
  mode,
  fontSize,
  level,
  numberOfLines,
  ...rest
}) => {
  const contentProps = {
    rightIcon,
    leftIcon,
    title,
    children,
    outlineColor: rest?.borderColor ?? color, //use button color for the outline color.
    textColor,
    isOutline,
    mode,
    fontSize,
    level,
    numberOfLines,
  };
  // TODO: Move LoadingIndicator into Button Content component
  const loadingProps = {
    isOutline,
    textColor,
    outlineColor: rest?.borderColor ?? color,
  };
  // TODO: DEBOUNCE ONPRESS
  // TODO: Make pressable Container and Styled button an HOC or render props
  return (
    <Container style={style}>
      <ButtonContainer
        color={color}
        mode={mode}
        isOutline={isOutline}
        {...rest}>
        {showIndicator && isLoading ? (
          <LoadingIndicator
            size={'small'}
            loadingColor={loadingColor}
            {...loadingProps}
          />
        ) : (
          <ButtonContent {...contentProps} />
        )}
      </ButtonContainer>
    </Container>
  );
};

export default BaseButton;
