import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

export const StyledIcon = styled(Icon).attrs({
  type: 'entypo',
  size: 18,
})``;

export const Container = styled.View`
  background-color: ${({ isSelected, theme, mode = 'light' }) => {
    if (isSelected) {
      return theme[mode].colors.success;
    }

    return theme[mode].colors.lightGray;
  }};
  border-radius: 50px;
  padding: 5px;
  /* border-width: 0.5px;
  border-color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark}; */
`;

export const LoaderContainer = styled.View`
  /* background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.white}; */
  padding: 5px;
  /* opacity: 0.5; */
`;

export const PlusIcon = styled(StyledIcon).attrs(
  ({ theme, mode = 'light' }) => ({
    name: 'plus',
    color: theme[mode].colors.dark,
  })
)``;

export const CheckIcon = styled(StyledIcon).attrs(
  ({ theme, mode = 'light' }) => ({
    name: 'check',
    color: theme[mode].colors.white,
  })
)``;
