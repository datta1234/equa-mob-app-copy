import styled from 'styled-components/native';

export const InfoBoxContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  padding-horizontal: 30px;
  padding-vertical: 20px;
  border-radius: 15px;
`;

export const ListContainer = styled.View`
  padding-top: 10px;
`;
export const ListItemContainer = styled.View`
  padding-bottom: 10px;
  flex-direction: row;
`;
