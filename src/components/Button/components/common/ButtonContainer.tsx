import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import useThrottle from 'hooks/useThrottle';
import useDebounce from 'hooks/useDebounce';

import { PressableContainer, StyledButton } from './buttonContainer.styles';

const LinearHeader = styled(LinearGradient).attrs(
  ({ theme, mode = 'light' }) => ({
    colors: theme[mode].background.linear,
  })
)`
  /* padding-bottom: 30px; */ /* Used if a negative margin is applied to body */
  flex-grow: 1;
`;

const ButtonContainer = ({
  onLayout,
  round,
  onPressHandler,
  disabled,
  children,
  color,
  isOutline,
  mode,
  ...rest
}) => {
  // TODO: Make pressable Container and Styled button an HOC or render props

  const onPress = useDebounce(onPressHandler, 100); // TODO: move to API level don't delay button clicks here
  return (
    <PressableContainer onPress={onPressHandler} disabled={disabled}>
      <StyledButton
        onLayout={onLayout}
        round={round}
        color={color}
        mode={mode}
        isOutline={isOutline}
        disabled={disabled}
        {...rest}>
        {/* <LinearHeader> */}
        {children}
        {/* </LinearHeader> */}
      </StyledButton>
    </PressableContainer>
  );
};

export default ButtonContainer;
