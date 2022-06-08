import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { Typography } from 'components';

export const Container = styled.View`
  /* margin-top: 25px; */
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: 25px;
`;

export const AccentBlcok = styled.View`
  flex: 1;
`;

export const DescriptionBlcok = styled.View`
  min-height: 75px;
  padding-vertical: 15px;
  /* flex: 1; */
  /* padding: 25px;
  padding-bottom: 0; */
`;

export const TitleText = styled(Typography.Title).attrs({
  mode: 'dark',
  center: true,
})`
  font-size: 38px;
`;

export const SubtitleText = styled(Typography.Text).attrs({
  mode: 'dark',
  center: true,
  size: 'big',
})`
  /* font-size: px; */
`;
