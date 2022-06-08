import styled from 'styled-components/native';

export const BlockContainer = styled.View`
  margin-top: 30px;
`;

export const TitleContainer = styled.View`
  padding-bottom: 15px;
`;

export const ScrollViewContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: 50,
  },
})`
  flex: 1;
  padding-horizontal: 15px;
  padding-bottom: 30px;
`;
