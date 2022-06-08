import styled from 'styled-components/native';

export const Container = styled.View`
  border-top-width: 1;
  border-color: ${({ theme, mode = 'light' }) => theme[mode].colors.lightGray};
  padding-vertical: 10px;
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.View`
  margin-right: 3;
  opacity: 0.85;
`;

// projectDescrionText: {
//   fontSize: 12,
//   opacity: 0.75,
// },
// projectDescrionIconContainer: {
//   marginRight: 3,
//   opacity: 0.85,
// },
// projectDescrionContainer: {

// },
