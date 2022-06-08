import React, { useEffect, useRef } from 'react';

// import PropTypes from 'prop-types';
import { useRoute } from '@react-navigation/core';

import { Typography } from 'components';
import { isDefined } from 'utils/ramda';
import translator from 'utils/translator';

import { Container, TextInputContainer, StyledTextInput } from './styles';

const propTypes = {};

const defaultProps = {};

function Input({ value, onChange }) {
  const ref = useRef(null);
  const route = useRoute();

  const {
    params: { measuring, unit },
  } = route;

  useEffect(() => {
    if (isDefined(ref.current)) {
      ref.current.focus();
    }
  }, [ref]);

  return (
    <Container>
      <Typography.Title level={2}>{measuring}</Typography.Title>

      <TextInputContainer>
        <StyledTextInput
          placeholder={translator.translate(
            'manualInputScreen.fields.offset.placeholder'
          )}
          ref={ref}
          onChangeText={onChange}
          value={value}
        />

        <Typography.Title level={3}>{unit}</Typography.Title>
      </TextInputContainer>
    </Container>
  );
}

Input.defaultProps = defaultProps;
Input.propTypes = propTypes;
export default Input;
