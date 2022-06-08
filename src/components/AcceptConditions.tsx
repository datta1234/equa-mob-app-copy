import React from 'react';

import { StyleSheet, Linking } from 'react-native';
import styled from 'styled-components/native';

import CheckBox from 'components/Checkbox';
import { ClickableText, Text } from 'components/Typography';
import { scale, scaleHeight } from 'constants/layout';

const AcceptConditions = ({
  onPress,
  checked,
  disabled,
  text,
  hypertext,
  link,
}) => {
  return (
    <Container>
      <CheckBox onPress={onPress} checked={checked} disabled={disabled} />
      <Text size={'small'} style={s.checkboxText}>
        {text}
      </Text>
      <ClickableText
        size={'small'}
        make={['underline']}
        customStyle={s.policyText}
        text={hypertext}
        onPress={() => {
          Linking.openURL(link);
        }}
      />
    </Container>
  );
};

export default AcceptConditions;

const s = StyleSheet.create({
  checkboxText: {
    marginLeft: scale(15),
  },
});

const Container = styled.View`
  flex-direction: row;
  /* justify-content: center; */
  margin-left: ${scale(10)};
  margin-top: ${scaleHeight(10)};
  align-items: center;
`;
