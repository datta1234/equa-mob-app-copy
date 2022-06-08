import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import { Text } from 'components';
import { scaleHeight } from 'constants/layout';

export const SubTitleText = styled(Text).attrs({
  center: true,
  fontSize: 'h7',
  color: 'light',
  lineHeightRatio: 1.5,
})`
  font-weight: 600;
  width: 100%;
`;

const boxBorderRadius = 15;
const boxBorderWidth = 3;

export const EstimateBoarder = styled(LinearGradient).attrs(
  ({ theme, mode = 'light' }) => ({
    colors: ['#50CB99', '#1BA3A6', '#18858B'],
    start: { x: 0.0, y: 0.2 },
    end: { x: 0.2, y: 3.0 },
    //     locations: [0.09, 0.7, 0.9],
    //     useAngle: true,
    //     angle: 45,
    //     angleCenter: { x: 0.5, y: 0.5 },
  })
)`
  align-items: center;
  overflow: hidden;
  padding: ${boxBorderWidth + 'px'};
  border-radius: ${boxBorderRadius + 'px'};
  margin-top: ${scaleHeight(18) + 'px'};
`;

export const EstimateContainer = styled.View`
  align-items: center;
  padding: ${scaleHeight(15) + 'px'};
  border-radius: ${boxBorderRadius - boxBorderWidth + 'px'};
  background-color: ${({ theme }) => theme[theme.mode].background.secondary};
`;

export const EstimateMessage = styled(Text).attrs({
  center: true,
  color: 'secondary',
  fontSize: 'h7',
})`
  margin-bottom: ${scaleHeight(10) + 'px'};
  width: 100%;
  max-width: 276px;
`;

export const EstimateValue = styled(Text).attrs({
  center: true,
  bold: true,
  color: 'secondary',
  fontSize: 'h5',
})`
  /* margin-bottom: ${scaleHeight(10) + 'px'}; */
  width: 100%;
  max-width: 230px;
`;
