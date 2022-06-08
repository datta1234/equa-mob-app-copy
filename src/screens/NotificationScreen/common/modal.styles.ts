import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-horizontal: 30px;
`;

export const ContentContainer = styled.View`
  background-color: ${({ theme }) =>
    theme[theme.mode].background.primary};
  width: 100%;
  /* min-height: 320px; */
  padding: 30px;
  position: relative;
  border-radius: 30px;
  transform: translateY(-30px); /* // Moves the whole modal up 50px */
  align-items: center;
`;

export const GoBackOverlay = styled.TouchableOpacity.attrs({
  activeOpacity: 0,
})`
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
