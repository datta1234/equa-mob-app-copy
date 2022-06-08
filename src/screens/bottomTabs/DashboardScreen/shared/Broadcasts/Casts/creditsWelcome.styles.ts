import { Text } from 'components';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { scaleHeight } from 'constants/layout';

export const TitleContainer = styled(LinearGradient).attrs(
  ({ theme, mode = 'light' }) => ({
    colors: ['#50CB99', '#1BA3A6'],
    start: { x: 0.0, y: 0.2 },
    end: { x: 0.4, y: 0.6 },
  }),
)`
  align-items: center;
  /* overflow: hidden; */
  padding-horizontal: 18px;
  padding-vertical: 5px;
  border-radius: ${20 + 'px'};
  margin-top: ${scaleHeight(18) + 'px'};
  margin-bottom: ${scaleHeight(20) + 'px'};
`;

export const TitleText = styled(Text).attrs({
  center: true,
  fontSize: 'h7',
  color: 'light',
  lineHeightRatio: 1.5,
})`
  font-weight: 600;
  width: 100%;
`;
