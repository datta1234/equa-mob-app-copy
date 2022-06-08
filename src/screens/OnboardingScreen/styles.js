import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Typography } from 'components';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.darkAccent};
`;

export const SlideContainer = styled.View`
  width: ${width}px;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.darkAccent};
  padding: 15px;
`;

export const TitleText = styled(Typography.Title).attrs({
  mode: 'dark',
  center: true,
})`
  font-size: 48px;
`;

export const SubtitleText = styled(Typography.Text).attrs({
  mode: 'dark',
  center: true,
  size: 'big',
})`
  /* font-size: px; */
`;

export const StyledSafeAreaView = styled(SafeAreaView).attrs({
  edges: ['bottom'],
})`
  flex: 1;
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.black};
`;
