import styled from 'styled-components/native';

import { ClickableText } from 'components/Typography';

const ClearButton = styled(ClickableText).attrs({
  make: ['bold', 'underline'],
  size: 'small',
  center: true,
  uppercase: true,
})``;

export default ClearButton;
