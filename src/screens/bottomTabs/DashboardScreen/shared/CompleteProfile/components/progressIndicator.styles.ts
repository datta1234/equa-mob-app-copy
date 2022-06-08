import styled from 'styled-components/native';

import { Text } from 'components/Typography';
import { SCREEN_WIDTH } from 'constants/layout';

export const Container = styled.View`
  padding-top: 20px;
  padding-bottom: 15px;
  padding-horizontal: 20px;
  align-items: center;
`;

export const IconContainer = styled.View`
  background-color: ${({ theme, mode = 'light', isActive }) =>
    theme[mode].progressBar[isActive ? 'active' : 'inActive']};
  height: ${({ size = 27 }) => size + 'px'};
  width: ${({ size = 27 }) => size + 'px'};
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  border-width: 2px;
  border-color: ${({ theme, mode = 'light', isActive }) =>
    isActive ? theme[mode].progressBar.accent : theme[mode].background.dark};
`;

export const StepIndicatorContainer = styled.View`
  margin-top: 12px;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
`;
export const StepIconsIndicatorContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  flex-wrap: nowrap;
  position: absolute;
  bottom: 0;
  z-index: 10;
`;

export const Bar = styled.View`
  background-color: ${({ theme, mode = 'light', isActive, clear }) =>
    clear
      ? 'transparent'
      : theme[mode].progressBar[isActive ? 'accent' : 'inActive']};
  height: 5px;
  margin-left: 2px;
  width: ${({ isFirst, isLast, clear }) => {
    return (
      Math.round((SCREEN_WIDTH - 60) / (isFirst || isLast ? 8 : 4)) -
      (clear ? (isFirst ? 30 : 60) : 0) +
      'px'
    );
  }};

  margin-bottom: 16px;
  margin-top: 35px;

  border-top-left-radius: ${({ isFirst }) => (isFirst ? '8px' : 0)};
  border-bottom-left-radius: ${({ isFirst }) => (isFirst ? '8px' : 0)};

  border-top-right-radius: ${({ isLast }) => (isLast ? '8px' : 0)};
  border-bottom-right-radius: ${({ isLast }) => (isLast ? '8px' : 0)};
`;

export const ProgressFragmentContainer = styled.View`
  align-items: flex-start;
`;
export const ProgressContainer = styled.View`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  /* flex-wrap: nowrap; */
`;

export const BarTitleContainer = styled.View`
  align-items: center;
  width: 60px;
  z-index: 10;
  padding-bottom: 5px;
`;

export const BarTitle = styled(Text).attrs(({ isActive }) => ({
  size: 'tiny',
  color: isActive ? 'light' : 'tertiary',
}))`
  line-height: 18px;
  padding-bottom: 5px;
`;
