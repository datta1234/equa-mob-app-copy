import React from 'react';

import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { links } from 'constants';
import { scale, scaleHeight } from 'constants/layout';

import AcceptConditions from '../../../../components/AcceptConditions';

const label = 'Required';
const text = 'I agree to the';
const hypertext = ' terms and conditions';
const link = links.termsOfUse;

const Container = styled.View`
  margin-horizontal: ${({ withHorizontal = false }) =>
    withHorizontal ? '30px' : 0};
  margin-top: ${scaleHeight(10)};
`;

const Label = styled(Typography.Text).attrs({
  color: 'label',
  fontsize: 'h7',
})`
  margin-left: ${scale(50)};
`;

const RequiredConditions = ({ termsChecked, onTermsPress }) => {
  return (
    <Container>
      <Label text={label} />
      <AcceptConditions
        text={text}
        hypertext={hypertext}
        link={link}
        checked={termsChecked}
        onPress={onTermsPress}
      />
    </Container>
  );
};

export default RequiredConditions;
