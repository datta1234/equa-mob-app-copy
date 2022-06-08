import React from 'react';

import { DotIndicator } from 'react-native-indicators';
import styled from 'styled-components/native';

import { Typography } from 'components';
import { colors } from 'constants/';
import { scaleHeight } from 'constants/layout';

const ActionButton = styled(Typography.ClickableText).attrs({
  make: ['bold', 'underline'],
  center: true,
  size: 'small',
  color: 'primary',
})`
  margin-top: ${scaleHeight(10) + 'px'};
`;

export const Container = styled.View``;
export const LoadingContainer = styled.View`
  align-items: center;
  height: 17px;
  margin-top: ${scaleHeight(10) + 'px'};
`;

export const Text = styled(Typography.Text).attrs({
  color: 'primary',
  fontSize: 'h6',
  center: true,
})`
  margin-top: ${scaleHeight(20) + 'px'};
`;

const QuestionAction = ({ question, actionText, onActionPress, loading }) => (
  <Container>
    <Text>{question}</Text>
    {loading ? (
      <LoadingContainer>
        <DotIndicator size={5} color={colors.NAVY} />
      </LoadingContainer>
    ) : (
      <ActionButton text={actionText} onPress={onActionPress} />
    )}
  </Container>
);

export default QuestionAction;
