import styled from 'styled-components/native';

import { Icon } from 'components';
import Typography from 'components/Typography';

export const Body = styled.View`
  flex: 1;
  justify-content: space-between;
`;
export const Menu = styled.View`
  border-radius: 15px;
  margin-horizontal: 20px;
  margin-top: 30px;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
`;

export const MenuItemContainer = styled.View``;

export const Item = styled.TouchableOpacity`
  margin-vertical: 23px;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled(Typography.Title)`
  flex: 1;
`;

export const MenuIcon = styled(Icon).attrs({ size: 42 })`
  margin-horizontal: 23px;
`;

export const ForwardIcon = styled(Icon).attrs({
  type: 'forward',
})`
  margin-horizontal: 15px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 2px;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.tertiary};
`;
