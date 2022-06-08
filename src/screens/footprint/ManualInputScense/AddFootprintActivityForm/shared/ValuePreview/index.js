import React, { useState, useEffect } from 'react';

import { useIsFocused } from '@react-navigation/core';

import { getSmartCounterStream } from 'utils/common';
import { carbonOffsetFormat } from 'utils/formats';

import { Container, ValueText, ModuleText } from './styles';

const propTypes = {};

const defaultProps = {};

function ValuePreview({ value }) {
  const [_val, _setVal] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    const $smartCounterStream = getSmartCounterStream({
      initial: value,
      value: _val,
      animateTimeMs: 1500,
    });

    if (isFocused) {
      const subscription = $smartCounterStream.subscribe(_setVal);

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isFocused, value]);

  return (
    <Container>
      <ValueText>{carbonOffsetFormat(_val)}</ValueText>
      <ModuleText>kgCO2e</ModuleText>
    </Container>
  );
}

ValuePreview.defaultProps = defaultProps;
ValuePreview.propTypes = propTypes;
export default ValuePreview;
