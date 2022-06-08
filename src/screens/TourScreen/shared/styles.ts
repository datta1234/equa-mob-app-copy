import { Dimensions, Pressable } from 'react-native';
import styled, { css } from 'styled-components/native';

const { width, height } = Dimensions.get('window');

export const ContentContainer = styled.View`
  padding: 20px 25px;
`;

export const ContentItemContainer = styled.View`
  margin-top: ${-140 + 'px'};
`;

export const PressableStyled = styled(Pressable)`
  position: absolute;
  right: 25px;
  top: ${({ insets }) => 20 + insets.top + 'px'};
  z-index: 100;
  padding: 12px 20px 10px 20px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  elevation: 10;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
`;
