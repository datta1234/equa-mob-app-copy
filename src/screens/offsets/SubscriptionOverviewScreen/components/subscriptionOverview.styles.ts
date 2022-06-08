import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { scaleHeight } from 'constants/layout';

export const HeaderContainer = styled.View`
  flex: 1;
  margin-top: ${scaleHeight(0) + 'px'};
  /* background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary}; */
  padding-horizontal: 20px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;
export const DetailsContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.primary};
  margin-top: ${scaleHeight(12) + 'px'};
  /* margin-bottom: ${({ insets }) =>
    -insets.bottom + 'px'}; */ /* Remove safe area insets */
  padding-top: ${20 + 'px'};
  padding-bottom: ${scaleHeight(25) + 'px'};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export const Title = styled(Typography.Text).attrs({
  center: true,
  fontSize: 'h7',
  color: 'secondary',
})`
  font-weight: 400;
  padding-top: ${scaleHeight(20) + 'px'};
`;

export const FooterContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

export const InfoText = styled(Typography.Text).attrs({
  center: true,
  fontSize: 'h8',
  lineHeightRatio: 1.5,
  color: 'secondary',
})`
  padding-top: ${scaleHeight(12) + 'px'};
`;
