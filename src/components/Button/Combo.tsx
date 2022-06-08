import React from 'react';

import styled from 'styled-components/native';

import Button from 'components/Button/Button';
import { ClickableText } from 'components/Typography';
import { scaleHeight } from 'constants/layout';
import { isDefined } from 'utils/ramda';

export const Container = styled.View`
  /* align-items: center; */
  /* padding-top: ${scaleHeight(10) + 'px'}; */
  /* padding-bottom: ${scaleHeight(10) + 'px'}; */
`;

export const AgreeButton = styled(Button).attrs({})``;
//TODO: change to BUTTON but clear
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

const Combo = ({ style, primaryProps, secondaryProps }) => {
  return (
    <Container style={style}>
      {isDefined(primaryProps) && <AgreeButton {...primaryProps} />}
      {isDefined(secondaryProps) && <CancelButton {...secondaryProps} />}
    </Container>
  );
};

export default Combo;
