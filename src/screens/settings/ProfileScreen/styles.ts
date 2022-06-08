import styled from 'styled-components/native';

import { ClickableText } from 'components/Typography';
import { scaleHeight } from 'constants/layout';

export const ContentWrapper = styled.View`
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? '30px' : 0};
  margin-top: ${({ offSet = 0 }) => offSet + 'px'};
`;
export const AvatarContainer = styled.View`
  position: absolute;
  top: ${({ avatarSize = 0 }) => -(avatarSize / 2) + 'px'};
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const AvatarSpacer = styled.View`
  height: ${({ size = 0 }) => size + 'px'};
`;

export const ResetPasswordButton = styled(ClickableText).attrs({
  text: 'Reset password',
  make: ['underline'],
  fontSize: 'h6',
  color: 'primary',
})`
  margin-top: ${scaleHeight(20) + 'px'};
  align-self: center;
`;
