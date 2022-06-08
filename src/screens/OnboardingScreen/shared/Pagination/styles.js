import styled from 'styled-components';

export const DotContainer = styled.View`
  /* width: 15px;
  height: 15px;
  border-radius: 15px; */
  flex: 1;
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
`;

export const DotWrapper = styled.View`
  margin-horizontal: 5px;
`;

export const DotsContainer = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: center;
  /* background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.dark}; */
`;
