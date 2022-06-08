import { Image } from 'react-native';
import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { scaleHeight } from 'constants/layout';

export const Container = styled.View`
  align-items: center;
  padding-horizontal: 20px;
  padding-vertical: ${scaleHeight(15) + 'px'};
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  border-radius: 15px;
  margin-horizontal: 20px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding-bottom: ${scaleHeight(10) + 'px'};
`;
export const Text = styled(Typography.Text).attrs({
  color: 'primary',
  fontSize: 'h8',
  center: true,
  lineHeightRatio: 1.5,
})``;

export const ShieldImage = styled(Image).attrs({
  source: require('assets/icons/secure-shield.png'),
})`
  margin-left: 8px;
`;
