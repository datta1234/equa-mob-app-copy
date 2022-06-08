import { rgba } from 'polished';
import styled from 'styled-components/native';

import { scaleHeight } from 'constants/layout';

export const Container = styled.View`
  position: relative;
  flex: 1;
  /* background-color: ${({ theme }) =>
    rgba(theme[theme.mode].colors.dark, 0.5)}; */
  justify-content: flex-end;
  align-items: center;
`;

export const ContentContainer = styled.View`
  width: 100%;
  padding: 15px 20px 20px;
  background-color: ${({ theme}) =>
    theme[theme.mode].background.primary};

  justify-content: space-between;
  align-self: center;
  align-items: center;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  /* flex: 1; */
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

export const HeaderContainer = styled.View`
  flex-direction: row;
  /* padding-vertical: 5px; */
  justify-content: center;
  margin-bottom: ${scaleHeight(15) + 'px'};
`;

export const PullTargetBar = styled.View`
  background-color: ${({ theme }) =>
    theme[theme.mode].colors.mediumGray};
  border-radius: 120px;
  width: 80px;
  height: 5px;
`;
