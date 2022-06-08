import { Icon } from 'react-native-elements';
import styled from 'styled-components';

export const Container = styled.View`
  position: relative;
  min-height: 105px;
  align-items: center;
  justify-content: center;
`;

export const ImageContainer = styled.View`
  width: 105px;
  height: 105px;
  /* background-color: red; */
  border-radius: 105px;
  overflow: hidden;
`;

export const CheckIconContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.success};
  align-self: center;
  border-radius: 50px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;

export const Checkicon = styled(Icon).attrs(({ theme, mode = 'light' }) => ({
  type: 'entypo',
  name: 'check',
  size: 21,
  color: theme[mode].colors.white,
}))``;
