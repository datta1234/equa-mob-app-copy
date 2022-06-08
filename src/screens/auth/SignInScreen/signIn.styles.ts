import styled from 'styled-components/native';

import Button from 'components/Button';
import Typography, { ClickableText } from 'components/Typography';
import { scaleHeight } from 'constants/layout';

export const ContentWrapper = styled.View`
  flex: 1;
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? '30px' : 0};
  margin-vertical: ${({ withVertical = true }) => (withVertical ? '20px' : 0)};
`;
export const ForgotPassword = styled(ClickableText).attrs({
  text: 'Forgot Password?',
  size: 'small',
  mode: 'dark',
  type: 'primary',
  center: true,
})`
  margin-top: ${scaleHeight(25) + 'px'};
`;

export const ContentItemWrapper = styled.View`
  margin-vertical: 10px;
  margin-horizontal: ${({ withHorizontal }) => (withHorizontal ? '25px' : 0)};
`;

export const ActionButton = styled(Button).attrs({
  textColor: 'primary',
})`
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? '15px' : 0};
  margin-top: ${scaleHeight(30) + 'px'};
`;

export const QuestionText = styled(Typography.Text).attrs({
  size: 'small',
  mode: 'dark',
  type: 'primary',
  center: true,
})`
  margin-top: ${scaleHeight(30) + 'px'};
`;

export const CreateAccountButton = styled(Typography.ClickableText).attrs({
  text: 'Create Account',
  make: ['bold', 'underline'],
  size: 'small',
  color: 'accent',
  center: true,
  uppercase: true,
})`
  margin-top: ${scaleHeight(10) + 'px'};
`;
