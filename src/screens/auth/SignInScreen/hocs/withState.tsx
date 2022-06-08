import React, { useState } from 'react';

import { curry } from 'ramda';

import { getParam, isDefined, setParam } from 'utils/ramda';

import { FIELDS } from '../constants';

export default (WrappedComponent) => {
  return ({ onSubmitHandler, submitForgotPassword, ...rest }) => {
    const [formParams, setFormParams] = useState({
      [FIELDS.EMAIL.NAME]: '',
      [FIELDS.EMAIL.ERROR]: '',
      [FIELDS.PASSWORD.NAME]: '',
      [FIELDS.PASSWORD.ERROR]: '',
    });

    function onParamsChange(input) {
      setFormParams(input);
    }

    const setFormParam = curry((lensKey, key) =>
      onParamsChange(setParam(formParams, lensKey, key))
    );
    const getFormParam = getParam(formParams);

    const values = {
      email: getFormParam(FIELDS.EMAIL.NAME),
      password: getFormParam(FIELDS.PASSWORD.NAME),
    };
    const setValue = {
      email: (val) =>
        setFormParam(FIELDS.EMAIL.NAME)((val || ' ').toLowerCase().trim()),
      password: (val) => setFormParam(FIELDS.PASSWORD.NAME)(val),
    };

    const setError = {
      email: (error) => setFormParam(FIELDS.EMAIL.ERROR)(error),
      password: (error) => setFormParam(FIELDS.PASSWORD.ERROR)(error),
    };

    const clearError = {
      email: () => setFormParam(FIELDS.EMAIL.ERROR)(''),
      password: () => setFormParam(FIELDS.PASSWORD.ERROR)(''),
    };

    const errors = {
      email: getFormParam(FIELDS.EMAIL.ERROR),
      password: getFormParam(FIELDS.PASSWORD.ERROR),
    };

    const onForgotPasswordSubmit = () => {
      if (isDefined(getFormParam(FIELDS.EMAIL.NAME))) {
        submitForgotPassword({
          variables: { [FIELDS.EMAIL.NAME]: getFormParam(FIELDS.EMAIL.NAME) },
        });
      } else {
        setError.email('Please enter your email address to reset');
      }
    };

    return (
      <WrappedComponent
        {...rest}
        onSubmitHandler={() => onSubmitHandler({ variables: formParams })}
        onForgotPasswordSubmit={onForgotPasswordSubmit}
        getFormParam={getFormParam}
        setFormParam={setFormParam}
        values={values}
        setValue={setValue}
        errors={errors}
        setError={setError}
        clearError={clearError}
      />
    );
  };
};
