import styled from 'styled-components/native';

import { Button, Typography } from 'components';
import { EmailInput } from 'components/TextInputs';
import colors from 'constants/colors';
import { scaleHeight } from 'constants/layout';

export const Email = styled(EmailInput).attrs({ style: {} })`
  color: ${colors.WHITE};
  margin-top: ${scaleHeight(20) + 'px'};
`;

export const ActionButton = styled(Button).attrs({
  textColor: 'primary',
})`
  margin-top: ${scaleHeight(65) + 'px'};
`;

const ClearButton = styled(Typography.ClickableText).attrs({
  make: ['bold', 'underline'],
  center: true,
  size: 'small',
})``;
export const CancelButton = styled(ClearButton).attrs({
  text: 'Cancel',
  color: 'light',

  uppercase: true,
})`
  margin-top: ${scaleHeight(30) + 'px'};
`;
