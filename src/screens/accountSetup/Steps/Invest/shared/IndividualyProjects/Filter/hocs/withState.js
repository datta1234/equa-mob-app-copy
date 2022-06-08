import React, { useState } from 'react';

import { curry } from 'ramda';

import { getIn, getParam, setParam } from 'utils/ramda';

export default (WrappedComponent) => (props) => {
  const { onChange } = props;
  const [filterParams, setFilterParams] = useState({
    type: 'all',
    location: 'all',
  });

  function onParamsChange(input) {
    onChange({ variables: input });
    setFilterParams(input);
  }

  const setFilterParam = curry((lensKey, key) =>
    onParamsChange(setParam(filterParams, lensKey, key))
  );
  const getFilterParam = getParam(filterParams);

  return (
    <WrappedComponent
      {...props}
      setFilterParam={setFilterParam}
      getFilterParam={getFilterParam}
    />
  );
};
