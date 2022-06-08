import React from 'react';

import styled from 'styled-components/native';

import CheckBox from 'components/Checkbox';
import Typography from 'components/Typography';
import { scale, scaleHeight } from 'constants/layout';
import { shadow } from 'constants/ui';

const confirmTitle = 'I confirm that I have received and carefully read the ';
const paymentTerms = 'Payment Terms.';

const Confirmation = ({ goToAgreement, areTermsAgreed, setTermsAgreed }) => (
  <Container>
    <CheckBox
      onPress={() => setTermsAgreed((prev) => !prev)}
      checked={areTermsAgreed}
    />
    <Text onPress={() => goToAgreement({ setTermsAgreed })}>
      {confirmTitle}
      <HighlightedText>{paymentTerms}</HighlightedText>
    </Text>
  </Container>
);

const Text = styled(Typography.Text).attrs({
  fontSize: 'h8',
  numberOfLines: 2,
  lineHeightRatio: 1.5,
  color: 'primary',
})`
  /* flex-shrink: 1; */
  /* align-self: stretch; */
  margin-left: 12px;
  font-weight: 600;
`;

const HighlightedText = styled(Text).attrs({})`
  text-decoration: underline;
  font-weight: 700;
`;

const Container = styled.View.attrs({
  ...shadow.secondary,
})`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  margin-horizontal: 20px;
  margin-top: ${scaleHeight(20) + 'px'};
  padding-horizontal: ${scale(15) + 'px'};
  padding-vertical: ${scale(14) + 'px'};
  border-radius: 15px;
  border-width: 0px;
  border-color: ${({ theme, mode = 'light' }) => theme[mode].buttons.primary};
`;

export default Confirmation;
