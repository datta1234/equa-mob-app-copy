import React, { useState } from 'react';

import { curry } from 'ramda';

import { getParam, setParam } from 'utils/ramda';

import { FIELDS } from '../constants';

export default (WrappedComponent) => {
  return ({ onSubmitHandler, ...rest }) => {
    const [formParams, setFormParams] = useState({
      [FIELDS.EMAIL.NAME]: '',
      [FIELDS.PASSWORD.NAME]: '',
    });

    function onParamsChange(input) {
      setFormParams(input);
    }

    const setFormParam = curry((lensKey, key) =>
      onParamsChange(setParam(formParams, lensKey, key))
    );
    const getFormParam = getParam(formParams);

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
