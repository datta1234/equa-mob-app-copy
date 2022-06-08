import styled from 'styled-components/native';

import Button from 'components/Button';
import Typography from 'components/Typography';
import { scaleHeight } from 'constants/layout';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  /* justify-content: space-between; */
  padding-top: ${scaleHeight(25) + 'px'};
  padding-bottom: ${scaleHeight(15) + 'px'};
`;
export const Title = styled(Typography.Title).attrs({
  lineHeightRatio: 1.5,
  level: 2,
  center: true,
})`
  margin-top: ${scaleHeight(25) + 'px'};
  margin-bottom: ${scaleHeight(10) + 'px'};
  font-weight: 600;
`;

export const Text = styled(Typography.Text).attrs({
  color: 'primary',
  lineHeightRatio: 1.5,
  center: true,
})`
  margin-bottom: ${scaleHeight(15) + 'px'};
  max-width: 285px;
`;

export const SubscribeButton = styled(Button).attrs({
  color: 'dark',
})`
  margin-top: ${scaleHeight(15) + 'px'};
`;
export const ClearButton = styled(Button.Clear).attrs({
  color: 'primary',
  fontSize: 'h7',
})`
  margin-top: ${scaleHeight(30) + 'px'};
`;
