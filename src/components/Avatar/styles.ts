import FastImage from 'react-native-fast-image';
import styled, { css } from 'styled-components/native';

import Typography from 'components/Typography';

export const AvatarContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  ${({ theme, mode = 'light', size = 100, color = 'primary', isIcon }) => css`
background-color: ${theme[mode].icons[color]};
  border-radius: ${(isIcon ? size : 21) + 'px'}
  /* padding: 21px; */
  width: ${size + 'px'}
  height: ${size + 'px'};
  align-self: center;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex: 1;
`}
`;

export const IconWrapper = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  border-radius: 25px;
  height: ${({ size = 35 }) => size + 'px'};
  width: ${({ size = 35 }) => size + 'px'};
  align-self: center;
  border-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  border-width: 1px;
  flex: 1;
`;
export const Wrapper = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  border-radius: 25px;
  align-self: center;
  border-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  border-width: 4px;
  flex: 1;
`;

export const Initials = styled(Typography.Title).attrs({
  color: 'light',
})`
  text-transform: uppercase;
  font-family: 'JosefinSans-Bold';
  font-size: ${({ size = 36 }) => size / 2.5 + 'px'};
  line-height: ${({ size = 36 }) => size / 2.5 + 'px'};
`;

export const AvatarImage = styled(FastImage).attrs({})`
  ${({ theme, mode = 'light', size = 100 }) => css`
  border-radius: 16px;
  /* padding: 21px; */
  width: ${size + 'px'}
  height: ${size + 'px'};

`}
`;
