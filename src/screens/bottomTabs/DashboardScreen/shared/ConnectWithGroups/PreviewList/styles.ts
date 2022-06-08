import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    flexDirection: 'row',
    paddingLeft: 25,
  },
})``;

export const ItemWrapper = styled.View`
  margin-right: 10px;
`;
