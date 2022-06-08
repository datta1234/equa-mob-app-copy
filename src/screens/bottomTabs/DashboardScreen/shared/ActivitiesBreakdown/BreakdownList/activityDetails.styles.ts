import styled from 'styled-components/native';

import Typography from 'components/Typography';

export const Container = styled.View`
  padding-top: 20px;
  padding-bottom: 10px;
  padding-horizontal: 30px;
  align-items: center;
  /* justify-content: space-between; */
`;

export const InfoText = styled(Typography.Text).attrs({
  fontSize: 'h7',
  lineHeightRatio: 1.5,
})``;
export const PercentageText = styled(InfoText).attrs({
  color: 'primary',
})`
  font-weight: 600;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-left: 6px;
  padding-right: 15px;
  padding-vertical: 7px;
  border-radius: 20px;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
`;
export const StatusText = styled(Typography.Text).attrs({
  color: 'primary',
  fontSize: 'h7',
  lineHeightRatio: 1.5,
})`
  font-weight: 600;
  padding-left: 15px;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin-top: 6px;
`;
export const IconContainer = styled.View`
  background-color: ${({ color }) => color};
  align-items: center;
  justify-content: center;
  height: 27px;
  width: 27px;
  border-radius: 20px;
`;
