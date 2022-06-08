import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.gray};
  width: 65px;
  height: 65px;

  border-radius: 65px;
  overflow: hidden;
`;
