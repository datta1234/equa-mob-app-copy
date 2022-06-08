import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { scale, scaleHeight } from 'constants/layout';

export const TotalContainer = styled.View`
  align-items: center;
`;

export const TotalText = styled(Typography.Text).attrs((props) => ({
  fontSize: props.fontSize ?? 'h9',
  lineHeightRatio: props.lineHeightRatio ?? 1.5,
  uppercase: true,
  color: 'secondary',
}))`
  padding-bottom: 5px;
`;

export const SumContainer = styled.View.attrs(({ size = 20 }) => ({
  height: size,
  width: size,
  borderRadius: size,
}))`
  margin-horizontal: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ final, theme, mode = 'light' }) =>
    theme[mode].icons[final ? 'secondary' : 'primary']};
  /* padding-vertical: 10px; */
`;

export const BlockContainer = styled.View`
  /* flex-direction: row; */
  align-items: center;
  justify-content: space-evenly;
  min-width: 300px;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  border-radius: 15px;
  padding-horizontal: ${scale(20) + 'px'};
  padding-vertical: 15px;
  margin-top: ${scaleHeight(10) + 'px'};
`;

export const EmissionsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  /* margin-bottom: 5px; */
`;
