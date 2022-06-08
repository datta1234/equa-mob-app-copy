import { rgba } from 'polished';
import styled from 'styled-components/native';

import { SCREEN_HEIGHT } from 'constants/layout';

export const Container = styled.View`
  position: relative;
  flex: 1;
  /* background-color: ${({ theme, mode = 'light' }) =>
    rgba(theme[mode].colors.dark, 0.5)}; */
  justify-content: flex-end;
`;

export const ButtonsContainer = styled.View`
  padding-top: 10px;
  padding-bottom: 20px;
  padding-horizontal: 30px;
`;

export const ContentContainer = styled.View`
  width: 100%;
  padding: 15px 20px 20px;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.primary};

  justify-content: space-between;
  align-self: center;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  /* flex: 1; */
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  /* padding-vertical: 5px; */
  justify-content: center;
  margin-bottom: 15px;
`;

export const PullTargetBar = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.mediumGray};
  border-radius: 120px;
  width: 80px;
  height: 5px;
`;

export const DescriptionContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-vertical: 15px;
`;

export const ActivityAitemsWrapper = styled.ScrollView.attrs(
  ({ scrollEnabled = false, ratio = 2 }) => ({
    scrollEnabled: scrollEnabled,
    height: scrollEnabled ? SCREEN_HEIGHT / ratio : 'auto',
  })
)`
  margin-vertical: 15px;
  margin-bottom: 25px;
`;

export const GoBackOverlay = styled.TouchableOpacity.attrs({
  activeOpacity: 0.75,
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
