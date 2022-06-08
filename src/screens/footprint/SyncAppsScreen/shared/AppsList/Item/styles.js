import { Switch } from 'react-native';
import styled from 'styled-components/native';

import Typography from 'components/Typography';

export const StyledSwitch = styled(Switch)`
  transform: scale(0.9);
`;

export const Container = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  padding: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex: 2;
  margin-right: 15px;
`;

export const Styledimg = styled.Image`
  width: 50px;
  height: 50px;

  margin-right: 15px;

  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.lightGray};
  border-radius: 9px;
`;

export const NameText = styled(Typography.Title).attrs({
  level: 3,
})`
  font-family: 'JosefinSans-Regular';
  color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
`;
