import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.lightGray};

  padding: 25px 50px 40px;
`;

export const TitleWrapper = styled.View`
  margin-bottom: 10px;
`;

export const ButtonWrapper = styled.View`
  margin-top: 20px;
  width: 100%;

  /* padding-horizontal: 50px; */
`;
