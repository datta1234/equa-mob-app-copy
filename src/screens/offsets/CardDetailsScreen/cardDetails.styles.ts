import styled from 'styled-components/native';

import Button from 'components/Button';
import { ClickableText } from 'components/Typography';
import { scale, scaleHeight, SCREEN_WIDTH } from 'constants/layout';

export const FormWrapper = styled.View`
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? '30px' : 0};
  margin-top: ${({ offSet = 0 }) => scaleHeight(offSet) + 'px'};
  margin-bottom: ${({ offSet = 0 }) => scaleHeight(30) + 'px'};
`;
export const HeaderIconContainer = styled.View`
  position: absolute;
  top: ${({ iconHeight = 0 }) => -(iconHeight / 2) + 'px'};
  align-items: center;
  justify-content: center;
  width: 100%;
`;
export const HeaderIconSpacer = styled.View`
  height: ${({ iconHeight = 0 }) => iconHeight + 'px'};
`;

export const FooterContainer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;
export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  flex: 1;
  /* justify-content: center; */
`;
export const ExpiryWrapper = styled.View`
  margin-right: ${scale(18) + 'px'};
  flex: 1;
`;
export const CvcWrapper = styled.View`
  margin-left: ${scale(18) + 'px'};
  flex: 1;
`;

export const PayButton = styled(Button).attrs({})`
  margin-top: ${scaleHeight(24) + 'px'};
`;

export const CancelButton = styled(ClickableText).attrs({
  make: ['bold', 'underline'],
  size: 'small',
  mode: 'light',
  color: 'secondary',
  center: true,
  uppercase: true,
})`
  padding-top: ${scaleHeight(20) + 'px'};
`;
