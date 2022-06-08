import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

import Typography from 'components/Typography';

export const Container = styled.View``;

export const StyledTextInput = styled.TextInput.attrs({
  keyboardType: 'numeric',
})`
  color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
  font-size: ${({ theme, mode = 'light' }) => theme.fontSize.title[1]};
  font-family: 'JosefinSans-Medium';
  flex: 1;
  padding: 10px;
`;

export const TextInputContainer = styled.View`
  border-bottom-width: 1px;
  border-color: ${({ theme, mode = 'light' }) => theme[mode].colors.lightGray};
  margin-vertical: 10px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
`;
