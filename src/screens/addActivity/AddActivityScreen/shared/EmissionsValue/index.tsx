import React, { useState, useEffect } from 'react';

import { useIsFocused } from '@react-navigation/core';

import { getSmartCounterStream } from 'utils/common';
import { carbonOffsetFormat } from 'utils/formats';

import {
  EmissionContainer,
  DescriptionText,
  ValueContainer,
  ValueText,
  UnitText,
} from './styles';

const propTypes = {};

const defaultProps = {};

function ValuePreview({ title, value, unit }) {
  const [_val, _setVal] = useState(0);

  const isFocused = useIsFocused();

  useEffect(() => {
    setTimeout(() => {
      const $smartCounterStream = getSmartCounterStream({
        initial: value || 0,
        value: _val,
        animateTimeMs: 1500,
      });
      if (isFocused) {
        const subscription = $smartCounterStream.subscribe(_setVal);

        return () => {
          subscription.unsubscribe();
        };
      }
    }, 1000);
  }, [isFocused, value]);

  return (
    <EmissionContainer>
      <DescriptionText>{title}</DescriptionText>
      <ValueContainer>
        <ValueText>{carbonOffsetFormat(_val)}</ValueText>
        <UnitText>{unit}</UnitText>
      </ValueContainer>
    </EmissionContainer>
  );
}

ValuePreview.defaultProps = defaultProps;
ValuePreview.propTypes = propTypes;
export default ValuePreview;
