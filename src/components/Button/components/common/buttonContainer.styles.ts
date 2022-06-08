import { Animated } from 'react-native';
import styled, { css } from 'styled-components/native';

import { scale } from 'constants/layout';

export const PressableContainer = styled.TouchableOpacity.attrs(
  ({ disabled }) => ({
    // activeOpacity: disabled ? 1 : 0.5,
  })
)``;

export const StyledButton = styled(Animated.View).attrs(({ disabled }) => ({
  // activeOpacity: disabled ? 1 : 0.5,
}))`
  ${({
    isOutline,
    theme,
    mode,
    disabled,
    color,
    borderColor,
    round,
    borderRadius = 15,
  }) => css`
    opacity: ${disabled ? 0.7 : 1};
    border-width: 2px;
    border-color: ${theme[mode].buttons[borderColor ?? color]};
    padding-vertical: ${scale(round ? 12 : 15) + 'px'};
    padding-horizontal: ${scale(17) + 'px'};
    border-radius: ${round ? '50px' : borderRadius + 'px'};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: ${isOutline ? 'transparent' : theme[mode].buttons[color]};
    /* width: 100%; */ // will cause button to not shrink when in a defined width container on animation
  `}
`;
