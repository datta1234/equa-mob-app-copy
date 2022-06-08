import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { Typography } from 'components';
import { getSmartCounterStream } from 'utils/common';
import translator from 'utils/translator';

import TestimonialBlock from '../TestimonialBlocks';

import { withQuery } from './hocs';

const propTypes = {
  carbonOffset: PropTypes.number,
};

const defaultProps = {
  carbonOffset: 0,
};

function CreditsBlock({ carbonOffset }) {
  const [_val, _setVal] = useState(0);

  useEffect(() => {
    const $smartCounterStream = getSmartCounterStream({
      initial: carbonOffset,
      value: _val,
      animateTimeMs: 8000,
    });

    const subscription = $smartCounterStream.subscribe(_setVal);

    return () => {
      subscription.unsubscribe();
    };
  }, [carbonOffset]);

  return (
    <TestimonialBlock.Item
      value={_val.toFixed(2)}
      module="kgCO2e"
      description={translator.translate('profileScreen.credits')}
    />
  );
}

CreditsBlock.defaultProps = defaultProps;
CreditsBlock.propTypes = propTypes;
export default withQuery(CreditsBlock);
