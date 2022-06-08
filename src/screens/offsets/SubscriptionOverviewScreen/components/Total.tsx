import React from 'react';

import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { scaleHeight } from 'constants/layout';
import { roundNumber } from 'utils/common';

const Text = styled(Typography.Text).attrs({
  //   center: true,
  fontSize: 'h6',
  color: 'primary',
})`
  font-weight: 600;
`;

const Amount = styled(Text).attrs({})`
  font-weight: 700;
`;

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  margin-horizontal: 20px;
  margin-top: ${scaleHeight(20) + 'px'};
  padding-horizontal: 17px;
  padding-vertical: 15px;
  border-width: ${2 + 'px'};
  border-radius: 15px;
  border-color: ${({ theme, mode = 'light' }) =>
    theme[mode].buttons['primary']};
`;

const Total = ({ quote }) => (
  <Container>
    <Text>Total</Text>
    <Amount>{`${quote?.currency?.symbol}${roundNumber(
      quote?.totalAmount,
      2
    ).toFixed(2)}`}</Amount>
  </Container>
);

export default Total;
