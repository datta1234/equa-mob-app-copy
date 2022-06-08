import React from 'react';

import { View } from 'react-native';
import styled from 'styled-components';

import { Spinner } from 'components';
import { isNotDefined } from 'utils/ramda';

const SpinnerBlock = () => (
  <SpinnerContainer>
    <View>
      <Spinner size="small" />
    </View>
  </SpinnerContainer>
);

export default (WrappedComponent) => (props) => {
  const { project } = props;

  if (isNotDefined(project)) {
    return <SpinnerBlock />;
  }

  return <WrappedComponent {...props} />;
};

const SpinnerContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
`;
