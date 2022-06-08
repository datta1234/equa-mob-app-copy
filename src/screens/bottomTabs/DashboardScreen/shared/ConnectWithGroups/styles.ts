import styled from 'styled-components/native';

export const Container = styled.View`
  /* background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.dark}; */
  /* padding-vertical: 15px; */
  padding-bottom: 25px;
`;

export const PreviewListWrapper = styled.View`
  margin-vertical: 10px;
`;

export const ContentWrapper = styled.View`
  margin: 15px 25px;
`;

export const ButtonContainer = styled.View`
  max-width: 200px;
`;
