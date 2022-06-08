import styled, { css } from 'styled-components/native';

import Typography from '../../Typography';

export const Container = styled.View.attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.05,
  shadowRadius: 1.41,

  elevation: 2,
})`
  ${({ isActive, theme, mode = 'light' }) => css`
    background-color: ${isActive
      ? theme[mode].colors.dark
      : theme[mode].colors.white};
    align-self: center;
    border-width: 1px;
    border-color: ${theme[mode].colors.lightGray};
    padding: 8px 16px;
    border-radius: 50px;
    min-width: 75px;
  `}
`;

export const Title = styled(Typography.Title).attrs({
  level: 3,
})`
  ${({ isActive, theme, mode = 'light' }) => css`
    color: ${isActive ? theme[mode].colors.white : theme[mode].colors.dark};
    align-self: center;
  `}
`;
