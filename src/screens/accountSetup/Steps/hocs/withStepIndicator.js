import React from 'react';

import StepIndicator from '../shared/StepIndicator';
import { ScreenContainer, ContentWrapper } from '../styles';

export default (WrappedComponent) => ({ currentScreenIndex, ...rest }) => {
  return (
    <ScreenContainer>
      <ContentWrapper style={{ marginVertical: 0 }}>
        <StepIndicator current={currentScreenIndex + 1} />
      </ContentWrapper>

      <WrappedComponent {...rest} />
    </ScreenContainer>
  );
};
