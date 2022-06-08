import React from 'react';

import PropTypes from 'prop-types';

import { withFadeIn } from 'hocs/withFadeIn';
import { carbonOffsetFormat } from 'utils/formats';

import {
  ValueText,
  Container,
  InputWrapper,
  InputContainer,
  LabelText,
  ModuleText,
  ValueContainer,
  PencilIcon,
  PencilIconContainer,
} from './styles';

const propTypes = {
  value: PropTypes.number,
  showPencil: PropTypes.bool,
};

const defaultProps = {
  value: 0,
  showPencil: true,
};

function ManualInputPreview({ measuring, unit, value, showPencil }) {
  return (
    <Container>
      <LabelText>{measuring}</LabelText>

      <InputWrapper>
        <InputContainer>
          <ValueContainer>
            <ValueText>{carbonOffsetFormat(value)}</ValueText>
          </ValueContainer>

          <ModuleText>{unit}</ModuleText>
        </InputContainer>

        {showPencil && (
          <PencilIconContainer>
            <PencilIcon />
          </PencilIconContainer>
        )}
      </InputWrapper>
    </Container>
  );
}

ManualInputPreview.defaultProps = defaultProps;
ManualInputPreview.propTypes = propTypes;
export default withFadeIn({
  animationConfig: {
    duration: 150,
    initialValue: 0,
    useNativeDriver: true,
  },
})(ManualInputPreview);
