import React from 'react';
import { Fragment } from 'react';

import { isDefined } from 'utils/ramda';

import Slider from '../shared/Slider';

export default (WrappedComponent) => (props) => {
  const { slider } = props;

  return (
    <Fragment>
      <WrappedComponent {...props} />
      {isDefined(slider) && <Slider {...slider} />}
    </Fragment>
  );
};
