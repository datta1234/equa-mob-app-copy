import { rgba } from 'polished';
import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
  flex: 1;
  /* background-color: ${({ theme, mode = 'light' }) =>
    rgba(theme[mode].colors.dark, 0.5)}; */
  justify-content: flex-end;
`;

export const ContentContainer = styled.KeyboardAvoidingView.attrs({
  // keyboardVerticalOffset: -24,
  behavior: 'padding',
})`
  width: 100%;
  padding: 15px;
  padding-bottom: 0;
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  flex: 1;
  margin-top: 50%;

  justify-content: space-between;
  align-self: center;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
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

export const GoBackOverlay = styled.TouchableOpacity.attrs({
  activeOpacity: 0.75,
})`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
