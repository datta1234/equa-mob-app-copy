import styled from 'styled-components/native';

import Button from 'components/Button';
import Typography from 'components/Typography';
import { ClickableText } from 'components/Typography';
import { scale, scaleHeight } from 'constants/layout';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  /* justify-content: space-between; */
  padding-top: ${scaleHeight(35) + 'px'};
  padding-bottom: ${scaleHeight(30) + 'px'};
  /* padding-horizontal: ${scale(26) + 'px'}; */
`;
export const Title = styled(Typography.Title).attrs({
  lineHeightRatio: 1.5,
  level: 2,
})`
  margin-top: ${scaleHeight(25) + 'px'};
  font-weight: 600;
`;
export const Text = styled(Typography.Text).attrs({
  color: 'primary',
  lineHeightRatio: 1.5,
  fontSize: 'h7',
})`
  margin-top: ${scaleHeight(30) + 'px'};
  margin-horizontal: ${scale(35, 5) + 'px'};
  /* margin-bottom: ${scaleHeight(30) + 'px'}; */
`;

export const FooterContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

export const AgreeButton = styled(Button).attrs({})`
  margin-top: ${scaleHeight(24) + 'px'};
`;

export const CancelButton = styled(ClickableText).attrs({
  make: ['bold', 'underline'],
  size: 'small',
  mode: 'light',
  color: 'secondary',
  center: true,
  uppercase: true,
})`
  padding-top: ${scaleHeight(20) + 'px'};
`;
