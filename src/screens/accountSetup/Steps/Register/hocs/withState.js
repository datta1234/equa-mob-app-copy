import React, { useEffect, useState } from 'react';

import { curry } from 'ramda';

import { getParam, setParam, getIn } from 'utils/ramda';

import { FIELDS } from '../constants';

// PASSWORD_CONFIRMATION

export default (WrappedComponent) => {
  return ({ ...rest }) => {
    const mobileNumber = getIn('me.mobileNumber', rest);
    // console.log("rest", rest)
    const [formParams, setFormParams] = useState({
      ...rest.me,
      // [FIELDS.FIRST_NAME.NAME]: 'Alexander',
      // [FIELDS.LAST_NAME.NAME]: 'Herzberg',
      // [FIELDS.LOCATION.NAME]: 'London, UK',
      // [FIELDS.PASSWORD.NAME]: 'maximan772',
      // [FIELDS.PASSWORD_CONFIRMATION.NAME]: 'maximan772',
    });

    function onParamsChange(input) {
      setFormParams(input);
    }

    const setFormParam = curry((lensKey, key) =>
      onParamsChange(setParam(formParams, lensKey, key))
    );
    const getFormParam = getParam(formParams);

    // useEffect(() => {
    //   if (rest.me) {
    //     setFormParam(FIELDS.EMAIL.NAME, `alex@test${mobileNumber}.com`);
    //   }
    // }, [rest.me]);

    return (
      <WrappedComponent
        {...rest}
        // onSubmitHandler={() =>
        //   onSubmitHandler({ variables: formParams, context: { a: 'b' } })
        // }
        formParams={formParams}
        setFormParams={setFormParams}
        getFormParam={getFormParam}
        setFormParam={setFormParam}
      />
    );
  };
};
