import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import Button from 'components/Button';
import { scale, scaleHeight } from 'constants/layout';
import { shadow } from 'constants/ui';
import { isIOS } from 'utils/helpers';

const borderRadius = 30;

const Container = styled.View.attrs({})`
  /* align-items: center; */
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
  margin-top: ${-borderRadius + 'px'};
  padding-top: ${scaleHeight(15) + 'px'};
  padding-bottom: ${({ insets }) =>
    insets.bottom + scaleHeight(isIOS ? 10 : 15) + 'px'};
  border-top-left-radius: ${borderRadius + 'px'};
  border-top-right-radius: ${borderRadius + 'px'};
  padding-horizontal: ${scale(100) + 'px'};
`;

const Footer = ({ onNext, onCancel, isVisible = true }) => {
  const insets = useSafeAreaInsets();

  return isVisible ? (
    <Container insets={insets} style={{ ...shadow.primary }}>
      <Button onPressHandler={onNext}>Next</Button>
    </Container>
  ) : null;
};

export default Footer;
