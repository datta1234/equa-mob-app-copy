import styled from 'styled-components/native';

import { Button, Typography } from 'components';
import { scale, scaleHeight } from 'constants/layout';

export const ContentItemWrapper = styled.View`
  align-items: center;
  margin-vertical: ${scaleHeight(10) + 'px'};
  margin-horizontal: ${({ withHorizontal }) => (withHorizontal ? '25px' : 0)};
`;

export const ActionButton = styled(Button).attrs({
  textColor: 'primary',
})`
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? scale(10) + 'px' : 0};
  margin-top: ${scaleHeight(40) + 'px'};
`;

export const ResendButton = styled(Typography.ClickableText).attrs({
  text: 'Resend',
  make: ['bold', 'underline'],
  size: 'small',
  color: 'accent',
  center: true,
  uppercase: true,
})`
  margin-top: ${scaleHeight(10) + 'px'};
`;

export const Text = styled(Typography.Text).attrs({
  color: 'light',
  size: 'small',
  center: true,
  bold: true,
})`
  margin-top: ${scaleHeight(30) + 'px'};
`;
