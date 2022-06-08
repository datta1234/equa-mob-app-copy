import Slider from '@react-native-community/slider';
import { rgba } from 'polished';
import styled from 'styled-components/native';

import { Typography } from 'components';

export const Container = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.success};

  padding: 16px;

  flex-direction: row;
  justify-content: space-between;
`;

export const SliderContainer = styled.View`
  margin-right: 15px;
  flex: 1;
`;

export const StyledSlider = styled(Slider).attrs(
  ({ theme, mode = 'light' }) => ({
    // minimumValue: 0,
    // maximumValue: 100,
    minimumTrackTintColor: theme[mode].colors.white,
    maximumTrackTintColor: rgba(theme[mode].colors.lightGray, 0.25),
  })
)`
  flex: 1;
  height: 40;
`;

export const ValueContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-horizontal: 10px;
  border-bottom-width: 1px;
  min-width: 80px;
  border-color: ${({ theme, mode = 'light' }) =>
    rgba(theme[mode].colors.lightGray, 0.5)};
`;

export const ValueText = styled(Typography.Title).attrs({
  level: 2,
})`
  color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
`;
