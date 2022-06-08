import React, { useEffect, useState } from 'react';

import { gql, useLazyQuery } from '@apollo/client';
import { useIsFocused, useRoute } from '@react-navigation/core';
import { mergeDeepLeft, pick, pipe, tap, when } from 'ramda';

import { debounce } from 'utils/common';
import { isDefined, getIn } from 'utils/ramda';

const QUERY_NAME = 'footprintCalculator';

const CALCULATE_CARBON_DIOXIDE_VOLUMNE = gql`
  query GetCarbonDioxideVolume($emissionId: ID!, $value: Float!) {
    ${QUERY_NAME}(emissionId: $emissionId, value: $value) {
      carbonDioxideVolume
      value
    }
  }
`;

export default (WrappedComponent) => {
  return ({ setFootprintActivityState, ...rest }) => {
    // const { getFootprintStateParam } = rest;

    const [carbonDioxideVolume, setCarbonDioxideVolume] = useState(0);

    const { getFootprintStateParam } = rest;

    const isFocused = useIsFocused();

    const [calculateCarbonDioxideVolume, { data, error }] = useLazyQuery(
      CALCULATE_CARBON_DIOXIDE_VOLUMNE,
      {
        // onCompleted: console.log,
        onCompleted: pipe(
          getIn([QUERY_NAME, 'carbonDioxideVolume']),
          setCarbonDioxideVolume
        ),
      }
    );

    useEffect(() => {
      if (isFocused) {
        const value = getFootprintStateParam('value');
        const emissionId = getFootprintStateParam('emission.id');

        if (isDefined(emissionId) && value) {
          console.log('calculate');
          calculateCarbonDioxideVolume({
            variables: {
              emissionId,
              value,
            },
          });

          return () => null;
        }

        setCarbonDioxideVolume(0);
      }
    }, [
      getFootprintStateParam('value'),
      getFootprintStateParam('emission'),
      isFocused,
    ]);

    // useEffect(() => {
    //     setCarbonDioxideVolume(0);
    // }, [
    //   getFootprintStateParam('value'),
    //   getFootprintStateParam('emission'),
    //   isFocused,
    // ]);

    return (
      <WrappedComponent
        {...rest}
        calculateCarbonDioxideVolume={(emissionId, value) =>
          calculateCarbonDioxideVolume({
            variables: {
              emissionId,
              value,
            },
          })
        }
        carbonDioxideVolume={carbonDioxideVolume}
      />
    );
  };
};
