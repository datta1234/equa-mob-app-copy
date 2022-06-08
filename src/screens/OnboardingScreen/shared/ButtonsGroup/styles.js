import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const ButtonItems = styled.View`
  flex-direction: row;
`;

export const ButtonItem = styled.View`
  flex: 1;
  margin-horizontal: 2.5px;
`;

export const LeftIcon = styled(Icon).attrs(({ theme, mode = 'light' }) => ({
  type: 'ionicon',
  name: 'chevron-back',
  size: 32,

  color: theme[mode].colors.dark,
}))``;
