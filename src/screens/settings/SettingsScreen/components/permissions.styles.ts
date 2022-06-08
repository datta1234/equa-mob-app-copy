import { Switch } from 'react-native';
import styled from 'styled-components/native';

import Button from 'components/Button';
import Typography from 'components/Typography';
import { scale, scaleHeight } from 'constants/layout';

export const LoadingContainer = styled.View`
  align-items: center;
  height: 250px;
`;
export const SaveButton = styled(Button).attrs({
  title: 'Save',
})`
  margin-top: ${scaleHeight(20) + 'px'};
  align-self: center;
  min-width: 110px;
`;

export const Container = styled.View`
  margin-horizontal: 20px;
  align-self: stretch;
`;
export const PermissionsContainer = styled.View`
  border-radius: 15px;
  margin-top: 30px;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
`;

export const PermissionContainer = styled.View`
  /* width: 100%; */
  /* flex: 1; */
  /* flex-wrap: wrap; */
  margin-horizontal: ${scale(30) + 'px'};
  margin-top: ${({ isFirst }) =>
    (isFirst ? scale(23) : scaleHeight(23)) + 'px'};
  margin-bottom: ${({ isLast }) =>
    (isLast ? scale(23) : scaleHeight(0)) + 'px'};
`;

export const Row = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
`;

export const ItemType = styled.View`
  flex: 1;
`;

export const Title = styled(Typography.Title).attrs({
  fontSize: 'h5',
  color: 'primary',
})``;
export const Description = styled(Typography.Text).attrs({
  fontSize: 'h8',
  color: 'primary',
})`
  margin-top: 7px;
`;

export const PermissionSwitch = styled(Switch).attrs(({ theme, value }) => ({
  ios_backgroundColor: theme.light.toggle.inactive,
  thumbColor: value
    ? theme.light.toggle.thumbActive
    : theme.light.toggle.thumbInactive,
  trackColor: {
    true: theme.light.toggle.active,
    false: theme.light.toggle.inactive,
  },
}))`
  margin-left: ${scale(30) + 'px'};
`;
