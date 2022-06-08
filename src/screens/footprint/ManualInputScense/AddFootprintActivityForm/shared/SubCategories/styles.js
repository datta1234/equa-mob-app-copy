import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ItemWrapper = styled.View`
  margin: 5px;
`;

export const HorizontalScrollContainer = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
})``;
