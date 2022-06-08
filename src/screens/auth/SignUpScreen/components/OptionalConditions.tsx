import React from 'react';

import styled from 'styled-components/native';

import Typography from 'components/Typography';
import { links } from 'constants';
import { scale, scaleHeight } from 'constants/layout';

import AcceptConditions from '../../../../components/AcceptConditions';

const label = 'Optional';
const privacyText = 'I agree to the';
const privacyHypertext = ' privacy policy';
const privacyLink = links.privacyPolicy;
const shareText = 'I opt in to share my information';

const Container = styled.View`
  margin-horizontal: ${({ withHorizontal = false }) =>
    withHorizontal ? '30px' : 0};
  margin-top: ${scaleHeight(20)};
  margin-bottom: ${scaleHeight(10)};
`;

const Label = styled(Typography.Text).attrs({
  color: 'label',
  fontsize: 'h7',
})`
  margin-left: ${scale(50)};
`;

const OptionalConditions = ({
  shareChecked,
  privacyChecked,
  onPrivacyPress,
  onSharePress,
}) => {
  return (
    <Container>
      <Label text={label} />
      <AcceptConditions
        text={privacyText}
        hypertext={privacyHypertext}
        link={privacyLink}
        checked={privacyChecked}
        onPress={onPrivacyPress}
      />
      <AcceptConditions
        text={shareText}
        checked={shareChecked}
        onPress={onSharePress}
      />
    </Container>
  );
};

export default OptionalConditions;
