import React, { useState, useRef } from 'react';

import PropTypes from 'prop-types';

import {
  StyledSlider,
  Container,
  ValueContainer,
  ValueText,
  SliderContainer,
} from './styles';

const propTypes = {
  value: PropTypes.node.isRequired,
  maximumValue: PropTypes.number,
};

const defaultProps = {
  maximumValue: 100,
};

function ProjectCardItemSlider({ onChangeHandler, value, ...rest }) {
  // const permittedValue = useRef(null);
  const [permittedValue, setPermittedValue] = useState(null);

  return (
    <Container>
      <SliderContainer>
        <StyledSlider
          onSlidingComplete={(val) => {
            // permittedValue.current = null;
            setTimeout(() => {
              setPermittedValue(null);
            }, 10);
            onChangeHandler && onChangeHandler(val);
          }}
          step={1}
          value={permittedValue || value}
          onSlidingStart={(val) => {
            setPermittedValue(val);
          }}
          {...rest}
        />
      </SliderContainer>

      <ValueContainer>
        <ValueText>{Math.ceil(value * 10) / 10 + '%'}</ValueText>
      </ValueContainer>
    </Container>
  );
}

ProjectCardItemSlider.defaultProps = defaultProps;
ProjectCardItemSlider.propTypes = propTypes;
export default ProjectCardItemSlider;
