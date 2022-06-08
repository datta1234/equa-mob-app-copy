import { Icon } from 'react-native-elements';
import styled, { css } from 'styled-components/native';

import { scale, scaleHeight } from 'constants/layout';
import Typography from 'components/Typography';

export const TagContainer = styled.View`
  ${({ theme, mode = 'light', isActive, isSelected }) => css`
    opacity: ${!isActive ? 0.6 : 1};
    background-color: ${theme[mode].buttons[
      isSelected ? (isActive ? 'secondary' : 'secondaryDisabled') : 'clear'
    ]};
    border-color: ${isSelected
      ? 'transparent'
      : theme[mode].buttons.secondaryDisabled};
    border-width: 2px;
    padding-vertical: ${scaleHeight(10) + 'px'};
    padding-horizontal: ${scale(15) + 'px'};
    align-self: center;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
  `}
`;

export const TagText = styled(Typography.Title).attrs({
  level: 6,
  bold: true,
  uppercase: true,
})`
  color: ${({ theme, mode = 'light', isSelected }) =>
    theme[mode].text[isSelected ? 'light' : 'primary']};
`;

export const IconContainer = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 5px;
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const CheckIcon = styled(Icon).attrs(({ theme, mode = 'light' }) => ({
  color: theme[mode].colors.dark,
  name: 'check',
  type: 'entypo',
  size: 14,
}))``;
