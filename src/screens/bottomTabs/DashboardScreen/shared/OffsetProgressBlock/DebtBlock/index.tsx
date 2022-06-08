import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { pipe } from 'ramda';

import { Typography } from 'components';
import { getSmartCounterStream } from 'utils/common';
import translator from 'utils/translator';

import TestimonialBlock from '../TestimonialBlocks';

import { withQuery } from './hocs';

const propTypes = {
  carbonDioxideVolumeSum: PropTypes.number,
};

const defaultProps = {
  carbonDioxideVolumeSum: 0,
};

function DebtBlock({ carbonDioxideVolumeSum }) {
  const [_val, _setVal] = useState(0);

  useEffect(() => {
    const $smartCounterStream = getSmartCounterStream({
      initial: carbonDioxideVolumeSum,
      value: _val,
      animateTimeMs: 5000,
    });

    const subscription = $smartCounterStream.subscribe(_setVal);

    return () => {
      subscription.unsubscribe();
    };
  }, [carbonDioxideVolumeSum]);

  return (
    <TestimonialBlock.Item
      value={_val.toFixed(2)}
      module="kgCO2e"
      description={translator.translate('profileScreen.debt')}
      renderPostfix={() => (
        <Typography.Text center size="tiny" style={{ lineHeight: 15 }}>
          {translator.translate('profileScreen.addActivitiesPromt')}
        </Typography.Text>
      )}
    />
  );
}

DebtBlock.defaultProps = defaultProps;
DebtBlock.propTypes = propTypes;
export default pipe(React.memo, withQuery)(DebtBlock);
