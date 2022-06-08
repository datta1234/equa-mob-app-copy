import styled, { css } from 'styled-components/native';

import Typography from 'components/Typography';
import { scaleHeight } from 'constants/layout';

export const ComponentContainer = styled.View`
  padding-bottom: ${scaleHeight(10, 2) + 'px'};
`;

export const CategoryTitle = styled(Typography.Text).attrs({
  size: 'normal',
  color: 'secondary',
})`
  ${({ theme, mode = 'light' }) => css`
    margin-horizontal: 30px;
  `}
`;
export const CategoryToolTip = styled(Typography.Text).attrs({
  size: 'normal',
  color: 'info',
})`
  ${({ theme, mode = 'light' }) => css`
  margin-top: 5px
    margin-horizontal: 30px;
  `}
`;
export const ItemsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ItemWrapper = styled.View`
  margin-vertical: 5px;
  margin-left: ${({ idx }) => (idx === 0 ? '30px' : '0px')};
  margin-right: ${({ isLast }) => (isLast ? '30px' : '10px')};
`;

export const HorizontalScrollContainer = styled.ScrollView.attrs(({}) => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    flexDirection: 'row',
  },
}))``;
