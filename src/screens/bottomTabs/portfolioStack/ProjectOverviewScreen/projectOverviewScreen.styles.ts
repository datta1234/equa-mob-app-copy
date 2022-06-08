import styled from 'styled-components/native';

import Typography from 'components/Typography';

export const BodyTitle = styled(Typography.Title).attrs({
  bold: true,
  fontSize: 'h5',
})`
  padding-bottom: 6px;
`;

export const CategoryTitle = styled(Typography.Text).attrs({
  fontSize: 'h7',
  uppercase: true,
})`
  padding-bottom: 6px;
`;

export const BodyInfo = styled(Typography.Text).attrs({
  fontSize: 'h7',
  lineHeightRatio: 1.5,
  color: 'secondary',
})``;
