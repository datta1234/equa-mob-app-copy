import React, { useEffect, useState } from 'react';

import { length, map, zipWith } from 'ramda';

import { debounce } from 'utils/common';

import { FIELDS } from '../constants';
import { changeLinkedValues } from '../utils';

export default (WrappedComponent) => {
  return ({ onSubmitHandler, ...rest }) => {
    const { data } = rest;
    const [slidersValues, setSlidersValues] = useState([]);

    const onChangeSlider = (idx, value) =>
      setSlidersValues(changeLinkedValues(slidersValues, idx, value));

    useEffect(() => {
      setSlidersValues(
        map(({ interest }) => interest || 100 / length(data), data) // fixme
      );
    }, [data]);

    const mergedList = zipWith(
      ({ id }, interest) => ({
        [FIELDS.PROJECT_ID.NAME]: id,
        [FIELDS.INTEREST.NAME]: interest,
      }),
      data,
      slidersValues
    );

    return (
      <WrappedComponent
        {...rest}
        onChangeSlider={debounce(5, onChangeSlider)}
        slidersValues={slidersValues}
        onSubmitHandler={() => onSubmitHandler(mergedList)}
      />
    );
  };
};
