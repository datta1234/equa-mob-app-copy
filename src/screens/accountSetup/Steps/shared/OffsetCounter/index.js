import React, { useEffect, useState } from 'react';

// import PropTypes from 'prop-types';
import { View } from 'react-native';

import { Typography } from 'components';
import { getSmartCounterStream } from 'utils/common';
import { carbonOffsetFormat } from 'utils/formats';
import translator from 'utils/translator';

import {
  Container,
  ContentContainer,
  OffsetValue,
  HintWrapper,
} from './styles';

const propTypes = {};

const defaultProps = {};

function OffsetCounter({ value, interactive, partner }) {
  const [_val, _setVal] = useState(interactive ? 0 : value);

  useEffect(() => {
    if (interactive) {
      const $smartCounterStream = getSmartCounterStream({
        initial: value,
        value: _val,
        animateTimeMs: 5000,
      });

      const subscription = $smartCounterStream.subscribe(_setVal);

      return () => {
        subscription.unsubscribe();
      };
    }

    _setVal(value);
  }, [value]);

  return (
    <Container>
      <View>
        <ContentContainer>
          <OffsetValue>{carbonOffsetFormat(_val)}</OffsetValue>
          <Typography.Title>
            {translator.translate(
              'setupAccount.steps.invest.offsetCounter.tC02e'
            )}
          </Typography.Title>
        </ContentContainer>
      </View>

      <HintWrapper>
        <Typography.Text size="small">
          {translator.translate(
            'setupAccount.steps.invest.offsetCounter.subtitle',
            { businessName: partner && partner.businessName }
          )}
        </Typography.Text>
      </HintWrapper>
    </Container>
  );
}

OffsetCounter.defaultProps = defaultProps;
OffsetCounter.propTypes = propTypes;
export default OffsetCounter;
