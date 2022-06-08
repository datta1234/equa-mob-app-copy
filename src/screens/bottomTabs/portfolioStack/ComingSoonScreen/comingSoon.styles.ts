import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { scaleHeight } from 'constants/layout';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  /* justify-content: space-between; */
  padding-top: ${scaleHeight(50) + 'px'};
  padding-bottom: ${scaleHeight(30) + 'px'};
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
})`
  margin-top: ${scaleHeight(30) + 'px'};
  margin-bottom: ${scaleHeight(70) + 'px'};
`;
