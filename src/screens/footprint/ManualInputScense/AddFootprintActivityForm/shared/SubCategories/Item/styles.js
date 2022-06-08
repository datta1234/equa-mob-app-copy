import { Icon } from 'react-native-elements';
import styled, { css } from 'styled-components/native';

import Typography from 'components/Typography';

export const Container = styled.View`
  ${({ theme, mode = 'light', isActive }) => css`
    background-color: ${theme[mode].colors[
      isActive ? 'success' : 'lightGray1'
    ]};
    padding: 10px;
    align-self: center;
    border-radius: 6px;
    flex-direction: row;
    align-items: center;
  `}
`;

export const Nametext = styled(Typography.Title).attrs({
  level: 3,
})`
  color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
`;

export const IconContainer = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};

  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const CheckIcon = styled(Icon).attrs(({ theme, mode = 'light' }) => ({
  color: theme[mode].colors.success,
  name: 'check',
  type: 'entypo',
  size: 14,
}))``;
