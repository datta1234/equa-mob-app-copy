import React, { useState } from 'react';

import styled from 'styled-components/native';

import { SelectedSlices } from 'models/SelectedSlice';

import useSelectedSlice from '../../../hooks/useSelectedSlice';

import EmissionsChart from './EmissionsChart';
import { ChartLegend, EmissionsSliceDetails, InfographicText } from './shared';
import withQuery from './withQuery';

const InfographicContainer = styled.View`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.contrast};
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  margin-bottom: 0px;
`;
const ChartContainer = styled.View`
  /* align-items: center; */
  border-bottom-left-radius: ${({ isSliceSelected }) =>
    isSliceSelected ? 30 + 'px' : 30 + 'px'};
  border-bottom-right-radius: ${({ isSliceSelected }) =>
    isSliceSelected ? 30 + 'px' : 30 + 'px'};
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.secondary};
`;

const EmissionsInfographic = ({ data, isLoading }) => {
  const [selectedSlice, setSelectedSlice] = useSelectedSlice();
  const [showAverage, setShowAverage] = useState(true);

  if (!data) return null;

  const { emissionsTotals, total, region } = data || {};

  // determine when to use square Scale.
  const maxActivityValue = Math.max(...emissionsTotals.map((o) => o.total)); // OR USE: _.maxBy(emissionsTotals, 'totalPercentage');
  const minActivityValue = Math.min(
    ...emissionsTotals.map((o) => (o.total === 0 ? 100000 : o.total))
  ); // excludes 0 values.
  // const [smallest, next_smallest] = arr.filter(x => x).sort((a, b) => a - b);

  const isSquareScale = minActivityValue / maxActivityValue < 0.3; //squareScale if greater than 70% difference

  const emissionsTotalsWithoutAverages = emissionsTotals?.map((i) => ({
    ...i,
    averageTotalPerMonth: 280,
  }));

  // Polar area graph needs more than one piece of data to render otherwise it causes an app crash
  const emissionActivityTotals =
    emissionsTotals?.length < 2
      ? []
      : (showAverage ? emissionsTotals : emissionsTotalsWithoutAverages) || [];

  return (
    <InfographicContainer>
      <ChartContainer
        isSliceSelected={selectedSlice !== SelectedSlices.SELECT_NONE}>
        <InfographicText.Instructions>
          Tap a section to view details
        </InfographicText.Instructions>
        <EmissionsChart
          data={emissionActivityTotals}
          isLoading={isLoading}
          selectedSlice={selectedSlice}
          showAverage={showAverage}
          isSquareScale={isSquareScale}
          onSliceSelect={setSelectedSlice}
        />
        {/* <InfographicText.Disclaimer>
          Section totals may not add up to total emissions due to rounding
        </InfographicText.Disclaimer> */}
        <ChartLegend
          region={region}
          switchValue={showAverage}
          onSwitchChange={() => setShowAverage(!showAverage)}
        />
      </ChartContainer>
      <EmissionsSliceDetails
        region={region}
        setSelectedSlice={setSelectedSlice}
        selectedSlice={selectedSlice}
        emissionsTotals={emissionsTotals}
      />
    </InfographicContainer>
  );
};

export default withQuery(EmissionsInfographic);
