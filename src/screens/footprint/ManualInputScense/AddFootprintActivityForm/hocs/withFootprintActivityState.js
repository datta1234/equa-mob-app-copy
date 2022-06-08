import React, { useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/core';
import { curry } from 'ramda';

import { getParam, setParam } from 'utils/ramda';

export default (WrappedComponent) => {
  return ({ addFootprintActivity, ...rest }) => {
    const route = useRoute();
    const [init, setInit] = useState(false);
    const [footprintActivityState, setFootprintActivityState] = useState({
      // carbonDioxideVolume: 0,
      productName: route.params.productName,
      emission: route.params.QRResponse?.targetActivity.emission,
      emissionType: route.params.QRResponse?.targetActivity.emissionType,
      value: route.params.QRResponse?.targetActivity.value || 0,
    });

    function onParamsChange(input) {
      setFootprintActivityState(input);
    }

    const setFootprintStateParam = curry((lensKey, key) =>
      onParamsChange(setParam(footprintActivityState, lensKey, key))
    );
    const getFootprintStateParam = getParam(footprintActivityState);

    useEffect(() => {
      // calculateCarbonDioxideVolume(getFootprintStateParam('emission.id'), 0);

      if (init) {
        setFootprintActivityState((oldState) => ({
          ...oldState,
          emission: null,
          value: 0, // reset value?
        }));
      }

      setInit(true);
    }, [footprintActivityState.emissionType?.id]);

    return (
      <WrappedComponent
        {...rest}
        getFootprintStateParam={getFootprintStateParam}
        setFootprintStateParam={setFootprintStateParam}
        addFootprintActivity={() =>
          addFootprintActivity({
            productName: getFootprintStateParam('productName'),
            value: getFootprintStateParam('value'),
            emissionId: getFootprintStateParam('emission.id'),
          })
        }
      />
    );
  };
};
