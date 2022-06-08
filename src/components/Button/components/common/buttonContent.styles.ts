import { Animated } from 'react-native';
import styled, { css } from 'styled-components/native';

import Typography from 'components/Typography';

export const Container = styled(Animated.View)`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const IconContainer = styled.View`
  padding-left: ${({ isRight = false }) => (isRight ? '10px' : '0px')};
  padding-right: ${({ isLeft = false }) => (isLeft ? '10px' : '0px')};
`;

export const ButtonTitle = styled(Typography.Title).attrs(({ level = 5 }) => {
  return {
    uppercase: true,
    bold: true,
    level: level,
  };
})`
  ${({ isOutline, theme, mode = 'light', outlineColor, textColor }) => css`
    color: ${textColor
      ? theme[mode].text[textColor]
      : isOutline
      ? theme[mode].buttons[outlineColor]
      : theme[mode].text.light};
    align-self: center;
  `}
`;
