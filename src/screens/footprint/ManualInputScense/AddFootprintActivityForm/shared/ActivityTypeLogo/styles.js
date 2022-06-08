import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme, mode = 'light' }) => css`
    height: 80px;
    width: 80px;
    border-radius: 100px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    background-color: ${theme[mode].colors.lightGray};
  `}
`;
