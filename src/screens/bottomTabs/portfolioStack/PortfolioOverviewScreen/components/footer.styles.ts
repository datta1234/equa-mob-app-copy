import styled from 'styled-components/native';

import Button from 'components/Button';
import Typography from 'components/Typography';
import { scale, scaleHeight } from 'constants/layout';
import { isIOS } from 'utils/helpers';

export const Container = styled.View.attrs({})`
  position: absolute;
  bottom: 0;
  /* left: 0; */
  /* right: 0 */
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(30) + 'px'};
  padding-top: 17px;
  padding-bottom: ${({ insets }) =>
    insets.bottom + scaleHeight(isIOS ? 5 : 15) + 'px'};
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.dark};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

export const ActionButton = styled(Button).attrs({})``;
export const OffsetButton = styled(ActionButton).attrs({
  fontSize: 'h7',
})``;
export const DashboardButton = styled(ActionButton).attrs({
  fontSize: 'h8',
  round: true,
})``;

export const QuoteContainer = styled.View`
  padding-right: ${scale(10, 2) + 'px'};
  flex: 1;
`;

export const Col = styled.View`
  /* align-items: center; */
  background-color: #283e53;
  flex: 2;
  border-radius: 20px;
`;

export const CreditMessageContainer = styled.View`
  margin-vertical: 8px;
  margin-horizontal: 8px;
  max-width: 180px;
  align-items: center;
  align-self: center;
`;
export const MessageContainer = styled.View`
  padding-horizontal: ${scale(15, 2) + 'px'};
  padding-vertical: ${scaleHeight(8, 2) + 'px'};
  flex: 2;
  align-items: center;
  justify-content: center;
  background-color: #283e53;
  border-radius: 20px;
`;

export const Text = styled(Typography.Text).attrs({
  // fontSize: 'h8',
  center: true,
  color: 'lightSecondary',
})`
  padding-left: 5px; // fixes centering of text as spaces are on the right
`;

export const ValueDescription = styled(Typography.Text).attrs({
  fontSize: 'h8',
  color: 'tertiary',
})`
  padding-bottom: 15px;
  font-weight: 600;
`;

export const Value = styled(Typography.Title).attrs({
  fontSize: 'h7',
  color: 'light',
})`
  font-weight: 700;
`;
