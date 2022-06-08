import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { scale, scaleHeight } from 'constants/layout';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  /* justify-content: space-between; */
  padding-top: ${scaleHeight(35) + 'px'};
  padding-bottom: ${scaleHeight(30) + 'px'};
  padding-horizontal: ${scale(26) + 'px'};
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
  max-width: 280px;
  /* margin-bottom: ${scaleHeight(30) + 'px'}; */
`;

export const FooterContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;
