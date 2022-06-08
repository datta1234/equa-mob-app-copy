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
  size: 'big',
})`
  ${({ theme, mode = 'light' }) => css`
    color: ${theme[mode].colors.dark};
  `}
`;

export const RightIcon = styled(Icon).attrs(({ theme, mode = 'light' }) => ({
  name: 'chevron-right',
  type: 'feather',
  color: theme[mode].colors.mediumGray,
}))``;

export const ActivityIconContainer = styled.View`
  ${({ theme, mode = 'light' }) => css`
    height: 55px;
    width: 55px;
    border-radius: 100px;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    background-color: ${theme[mode].colors.lightGray};
  `}
`;

export const Container = styled.View`
  ${({ theme, mode = 'light' }) => css`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-color: ${theme[mode].colors.lightGray};
    border-bottom-width: 1px;
    padding-vertical: 15px;
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  `}
`;
