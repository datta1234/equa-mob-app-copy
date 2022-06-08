import React from 'react';

import ShoppingIcon from 'assets/svgs/offsets/ShoppingIcon';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import Typography from 'components/Typography';
import colors from 'constants/colors';
import { scaleHeight } from 'constants/layout';
import { roundNumber } from 'utils/common';

export const Container = styled(LinearGradient).attrs(
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
  border-radius: 15px;
  padding-horizontal: 30px;
  padding-vertical: ${scaleHeight(20) + 'px'};
  margin-top: ${scaleHeight(18) + 'px'};
`;

const ValueContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const AmountText = styled(Typography.Text).attrs({
  fontSize: 'h4',
  color: 'light',
})`
  font-weight: 400;
`;
const EmissionText = styled(AmountText).attrs({})`
  padding-left: 6px;
  color: #d3f2e6;
`;

const InfoText = styled(Typography.Text).attrs({
  //   center: true,
  fontSize: 'h7',
  lineHeightRatio: 1.5,
})`
  color: ${colors.GREEN3};
  font-weight: 400;
  padding-top: ${scaleHeight(6) + 'px'};
`;

const Quote = ({ quote }) => (
  <Container>
    <ValueContainer>
      <ShoppingIcon />
      <EmissionText>
        {quote?.totalKgCo2e?.valueRounded}
        {'kgCO2e'}
      </EmissionText>
      <AmountText>{` = ${quote?.currency?.symbol}${roundNumber(
        quote?.totalAmount,
        2
      ).toFixed(2)}`}</AmountText>
    </ValueContainer>
    <InfoText>{'based on your current footprint'}</InfoText>
  </Container>
);

export default Quote;
