import styled from 'styled-components/native';

import { Button, Typography } from 'components';
import { scaleHeight } from 'constants/layout';

export const ContentWrapper = styled.View`
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? '30px' : 0};
  margin-vertical: ${({ withVertical = true }) =>
    withVertical ? 25 + 'px' : 0};
`;
export const DetailsHeader = styled.View`
  margin-bottom: ${scaleHeight(20) + 'px'};
  border-radius: 40px;
  padding: ${scaleHeight(7) + 'px'};
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
`;
export const ContentItemWrapper = styled.View`
  margin-vertical: 10px;
  margin-horizontal: ${({ withHorizontal }) => (withHorizontal ? '25px' : 0)};
`;

export const ActionButton = styled(Button).attrs({
  textColor: 'light',
})`
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? '15px' : 0};
  margin-top: ${scaleHeight(15) + 'px'};
`;

const SecondaryButton = styled(Typography.ClickableText).attrs({
  text: '',
  color: 'secondary',
  make: ['bold', 'underline'],
  size: 'small',
  center: true,
  uppercase: true,
})`
  margin-top: ${scaleHeight(20) + 'px'};
`;

export const CancelButton = styled(SecondaryButton).attrs({
  text: 'Cancel',
})``;

export const SignInButton = styled(SecondaryButton).attrs({
  text: 'Sign In',
})``;
