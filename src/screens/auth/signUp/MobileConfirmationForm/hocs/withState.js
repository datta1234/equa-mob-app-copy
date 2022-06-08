import React, { useEffect, useState } from 'react';

import { curry, equals, length, pipe, when } from 'ramda';

import { getParam, setParam } from 'utils/ramda';

import { FIELDS } from '../constants';

const CONFIRMATION_CODE = '775277';

export default (WrappedComponent) => {
  return ({ onSubmitHandler, ...rest }) => {
    const [formParams, setFormParams] = useState({
      // [FIELDS.VEREFICATION_CODE.NAME]: '775277',
      [FIELDS.VEREFICATION_CODE.NAME]: '',
    });

    function onParamsChange(input) {
      setFormParams(input);
    }

    const setFormParam = curry((lensKey, key) =>
      onParamsChange(setParam(formParams, lensKey, key))
    );
    const getFormParam = getParam(formParams);

    // submit after true code
    useEffect(() => {
      when(equals(CONFIRMATION_CODE), () =>
        onSubmitHandler({ variables: formParams })
      )(getFormParam(FIELDS.VEREFICATION_CODE.NAME));
    }, [getFormParam(FIELDS.VEREFICATION_CODE.NAME)]);

    return (
      <WrappedComponent
        {...rest}
        onSubmitHandler={() => onSubmitHandler({ variables: formParams })}
        getFormParam={getFormParam}
        setFormParam={setFormParam}
      />
    );
  };
};
