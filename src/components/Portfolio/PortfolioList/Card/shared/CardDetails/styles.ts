import { rgba } from 'polished';
import styled, { css } from 'styled-components/native';

import { Title, Text } from 'components/Typography';

export const Container = styled.View`
  padding: 10px;
  ${({ isHorizontal, width }) =>
    isHorizontal
      ? css`
          flex: 1;
          justify-content: center;
        `
      : css`
          width: ${width + 'px'};
        `}
`;

export const PortfolioName = styled(Title).attrs({
  fontSize: 'h6',
})`
  font-weight: 600;
`;
export const Description = styled(Text).attrs({
  fontSize: 'h8',
  color: 'info',
  numberOfLines: 2,
  lineHeightRatio: 1.5,
})`
  padding-top: 2px;
`;

export const QuoteContainer = styled.View`
  padding-horizontal: 8px;
  padding-vertical: 5px;
  margin-top: 9px;
  border-radius: 10px;
  /* align-items: center; */
  align-self: flex-start;
  background-color: ${rgba('#D3F2E6', 0.5)};
  /* background-color: ${'#D3F2E680'}; */
`;

export const Value = styled(Title).attrs({
  fontSize: 'h8',
})`
  font-weight: 700;
`;
export const ValueDescription = styled(Text).attrs({
  fontSize: 'h8',
  color: 'primary',
})`
  padding-top: 2px;
`;
