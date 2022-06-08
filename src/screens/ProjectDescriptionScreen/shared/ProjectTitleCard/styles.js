import { rgba } from 'polished';
import styled from 'styled-components/native';

import { Typography } from 'components';

export const Container = styled.View`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  padding: 40px 25px 25px;
  border-radius: 8px;
  align-items: center;
`;

export const InvestorsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 10px;
`;

export const InvestorsCountContainer = styled.View`
  margin-left: 5px;
`;

export const AvatarWrapper = styled.View`
  border-width: 3px;
  border-radius: 50px;
  border-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
`;

export const AvatarsContainber = styled.View`
  flex-direction: row;
`;

export const TypeIconContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].colors.success};
  width: 60px;
  height: 60px;
  border-radius: 60px;
  padding: 12px;

  align-items: center;
  justify-content: center;
  align-self: center;

  position: absolute;
  top: -30px;
`;

export const TotalValueText = styled(Typography.Title).attrs({
  level: 2,
  center: true,
})`
  color: ${({ theme, mode = 'light' }) => theme[mode].colors.fonts.secondary};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  padding: 0 15px;
`;

export const ContentItemWrapper = styled.View`
  padding-vertical: 5px;
`;

export const LoaderContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme, mode = 'light' }) =>
    rgba(theme[mode].colors.dark, 0.05)};
  align-items: center;
  justify-content: center;
`;
