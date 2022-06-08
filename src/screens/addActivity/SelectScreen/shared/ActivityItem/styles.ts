import { Icon } from 'react-native-elements';
import styled, { css } from 'styled-components/native';

import Typography from 'components/Typography';

export const ActivityNameContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  padding-horizontal: 15px;
`;

export const ActivityName = styled(Typography.Text).attrs({
  size: 'normal',
})`
  ${({ theme, mode = 'light' }) => css`
    color: ${theme[mode].colors.dark};
    font-weight: 600;
  `}
`;

export const RightIcon = styled(Icon).attrs(({ theme, mode = 'light' }) => ({
  name: 'chevron-right',
  type: 'feather',
  size: 20,
  // reverse: true,
  // reverseColor: theme[mode].colors.accent,
  color: theme[mode].icons.dark,
}))``;

export const ActivityIconContainer = styled.View`
  ${({ theme, mode = 'light', size = 40 }) => css`
    height: ${size + 'px'};
    width: ${size + 'px'};
    border-radius: 100px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    background-color: ${theme[mode].colors.accent};
  `}
`;

export const Container = styled.View`
  ${({ theme, mode = 'light' }) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-radius: 15px;
    background-color: ${theme[mode].background.secondary};
    border-color: ${theme[mode].colors.lightGray};
    /* border-bottom-width: 1px; */
    padding-vertical: 15px;
    padding-horizontal: 15px;
    margin-vertical: 5px;
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  `}
`;
