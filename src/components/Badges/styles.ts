import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ItemWrapper = styled.View`
  margin: 5px 8px;

  margin-left: ${({ isFirst }) => (isFirst ? 0 : '8px')};
  margin-right: ${({ isLast }) => (isLast ? 0 : '8px')};
`;
