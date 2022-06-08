import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

import Typography from 'components/Typography';

export const Container = styled.View`
  /* background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.white}; */
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const InputWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const ValueContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  /* margin-bottom: -6px; */
`;

export const InputContainer = styled.View`
  border-bottom-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.lightGray1};
  border-bottom-width: 1px;

  flex-direction: row;
  justify-content: flex-end;
  margin-horizontal: 25px;
  padding-vertical: 10px;
  align-items: center;
  flex: 1;
`;

export const ValueText = styled(Typography.Title)`
  font-size: 38px;
  line-height: 38px;
`;

export const LabelText = styled(Typography.Text)``;

export const ModuleText = styled(Typography.Text)``;

export const PencilIconContainer = styled.View`
  transform: translateY(1px);
`;

export const PencilIcon = styled(Icon).attrs(({ theme, mode = 'light' }) => ({
  type: 'simple-line-icon',
  name: 'pencil',
  color: theme[mode].colors.gray,
  size: 21,
}))``;
