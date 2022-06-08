import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};

  align-items: center;
  justify-content: center;
`;
