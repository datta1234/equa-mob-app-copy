import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

export const IconContainer = styled.View`
  padding-horizontal: 15px;
`;

export const CloseIcon = styled(Icon).attrs(({ theme, mode = 'light' }) => ({
  type: 'antdesign',
  name: 'close',
  size: 32,

  color: theme[mode].colors.dark,
}))``;

export const LeftIcon = styled(Icon).attrs(({ theme, mode = 'light' }) => ({
  type: 'ionicon',
  name: 'chevron-back',
  size: 32,

  color: theme[mode].colors.dark,
}))``;
