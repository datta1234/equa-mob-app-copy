import styled from 'styled-components/native';

import { Text, Button } from 'components';
import { scaleHeight } from 'constants/layout';

export const Body = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? '30px' : 0};
  margin-vertical: ${({ withVertical = true }) =>
    withVertical ? 25 + 'px' : 0};
`;

export const InfoText = styled(Text).attrs({
  color: 'primary',
  lineHeightRatio: 1.5,
  center: true,
})`
  margin-bottom: ${scaleHeight(15) + 'px'};
  max-width: 285px;
`;

export const ClaimButton = styled(Button).attrs({
  title: 'Claim',
})`
  margin-top: ${scaleHeight(20) + 'px'};
  align-self: center;
  min-width: 110px;
`;
