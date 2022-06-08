import React from 'react';

import ShoppingIcon from 'assets/svgs/offsets/ShoppingIcon';
import { format } from 'date-fns';
import LinearGradient from 'react-native-linear-gradient';
import styled, { css } from 'styled-components/native';

import Typography from 'components/Typography';
import colors from 'constants/colors';
import { scaleHeight } from 'constants/layout';
import { roundNumber } from 'utils/common';

const boxBorderRadius = 15;
const boxBorderWidth = 3;

export const Boarder = styled(LinearGradient).attrs(
  ({ theme, mode = 'light' }) => ({
    colors: ['#50CB99', '#18858B'],
    start: { x: 0.0, y: 0.2 },
    end: { x: 0.2, y: 3.0 },
  }),
)`
  align-items: center;
  overflow: hidden;
  padding: ${boxBorderWidth + 'px'};
  border-radius: ${boxBorderRadius + 'px'};
  margin-top: ${scaleHeight(18) + 'px'};
`;

const SubContainer = styled.View`
  flex: 1;
  padding: 14px 18px 6px 23px;
  border-top-left-radius: ${boxBorderRadius - boxBorderWidth + 'px'};
  border-top-right-radius: ${boxBorderRadius - boxBorderWidth + 'px'};
  flex-direction: column;
  background-color: ${({ theme }) => theme[theme.mode].background.secondary};
  width: 100%;
`;
const BillingDateContainer = styled.View`
  flex: 1;
  padding: 14px 18px 6px 23px;
  flex-direction: column;
  border-bottom-left-radius: ${boxBorderRadius - boxBorderWidth + 'px'};
  border-bottom-right-radius: ${boxBorderRadius - boxBorderWidth + 'px'};
  align-items: center;
  background-color: #ffffff;
  width: 100%;
`;
const TotalContainer = styled.View`
  /* margin-bottom: 3px; */
  padding: 4px 18px 8px 23px;
  background-color: ${colors.GREEN6};
  width: 100%;
  ${({ isLast }) => css`
    border-bottom-left-radius: ${(isLast
      ? boxBorderRadius - boxBorderWidth
      : 0) + 'px'};
    border-bottom-right-radius: ${(isLast
      ? boxBorderRadius - boxBorderWidth
      : 0) + 'px'};
  `}
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Separator = styled.View`
  align-self: center;
  margin-vertical: 8px;
  height: 1px;
  margin-top: 5px;
  width: 100%;
  background-color: ${colors.GRAY6};
`;

const TotalText = styled(Typography.Text).attrs({
  fontSize: 'h5',
  lineHeightRatio: 1.1,
  color: 'primary',
})`
  font-weight: 600;
`;
const TotalAmount = styled(TotalText).attrs({
  fontSize: 'h5',
})`
  font-weight: 700;
`;

const EmissionText = styled(Typography.Text).attrs({
  fontSize: 'h6',
  lineHeightRatio: 1.1,
  color: 'primary',
})`
  font-weight: 600;
`;

const TitleText = styled(Typography.Text).attrs({
  fontSize: 'h6',
  lineHeightRatio: 1.5,
  color: 'highlight',
})`
  font-weight: 700;
`;

const InfoText = styled(Typography.Text).attrs({
  fontSize: 'h7',
  lineHeightRatio: 1.5,
  color: 'secondary',
})`
  margin-bottom: 5px;
`;

const BillingDateText = styled(Typography.Text).attrs({
  fontSize: 'h6',
  lineHeightRatio: 1.5,
  color: 'secondary',
})`
  margin-bottom: 5px;
`;

const DateBold = styled(BillingDateText).attrs({
  bold: true,
  color: 'primary',
})``;

const Quote = ({ quote, billingDate }) => {
  const symbol = quote?.currency?.symbol;
  const {
    totalHabitAmount,
    totalHabitKgCo2e,
    totalOnceOffAmount,
    totalOnceOffKgCo2e,
    totalAmount,
    totalKgCo2e,
  } = quote || {};

  return (
    <Boarder>
      <SubContainer>
        <Row>
          <TitleText>{'Based on your footprint'}</TitleText>
          <ShoppingIcon />
        </Row>
        <InfoText>{'Monthly emissions'}</InfoText>
        <Row>
          <EmissionText>
            {totalHabitKgCo2e?.valueRounded}
            {'kgCO2e'}
          </EmissionText>
          <EmissionText>
            {`${symbol}${roundNumber(totalHabitAmount, 2).toFixed(2)}`}
          </EmissionText>
        </Row>
        <Separator />
        <InfoText>{'Once-off emissions'}</InfoText>
        <Row>
          <EmissionText>
            {totalOnceOffKgCo2e?.valueRounded}
            {'kgCO2e'}
          </EmissionText>
          <EmissionText>
            {`${symbol}${roundNumber(totalOnceOffAmount, 2).toFixed(2)}`}
          </EmissionText>
        </Row>
      </SubContainer>
      <TotalContainer isLast={!billingDate}>
        <InfoText>{'Total'}</InfoText>
        <Row>
          <TotalText>
            {totalKgCo2e?.valueRounded}
            {'kgCO2e'}
          </TotalText>
          <TotalAmount>
            {`${symbol}${roundNumber(totalAmount, 2).toFixed(2)}`}
          </TotalAmount>
        </Row>
      </TotalContainer>
      {billingDate && (
        <BillingDateContainer>
          <BillingDateText>
            {'Next payment on '}
            <DateBold>{format(new Date(billingDate), 'dd LLL')}</DateBold>
          </BillingDateText>
        </BillingDateContainer>
      )}
    </Boarder>
  );
};

export default Quote;
