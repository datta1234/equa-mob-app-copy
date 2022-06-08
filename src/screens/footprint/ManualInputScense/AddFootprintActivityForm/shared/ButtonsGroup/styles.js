import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  padding: 10px;
  padding-bottom: 25px;

  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
`;

export const ButtonWrapper = styled.View`
  margin-horizontal: 5px;
  flex: 1;
`;
