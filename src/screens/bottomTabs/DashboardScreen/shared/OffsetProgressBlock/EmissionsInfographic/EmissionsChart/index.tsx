import React, { useState } from 'react';

import { View, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Svg } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import {
  VictoryBar,
  VictoryChart,
  createContainer,
  VictoryPolarAxis,
} from 'victory-native';

import {
  useScrollToBody,
  useOnScrollEvent,
} from 'components/Containers/BaseContainer';
import { activity as activityColor } from 'constants/colors';
import { isSmallDevice } from 'constants/layout';
import { SelectedSlices } from 'models/SelectedSlice';
import { configureLayoutAnimation } from 'utils/helpers';

import { setActivityFillColor } from './chartHelpers';
import { axisWidth, chartSize, graphPadding } from './constants';
import EmissionsLabel, { OverlayEmissionsLabel } from './EmissionsLabel';

const getSliceOpacity = ({ selectedSlice, datum }) => {
  if (selectedSlice === datum.activityTypeCode) {
    return 1;
  }
  if (selectedSlice === SelectedSlices.SELECT_NONE) {
    return datum.averageTotalPerMonth < datum.total ? 1 : 0.9;
  } else {
    return 0.4;
  }
};

const ActivitySlices = ({
  selectedSlice,
  showAverage,
  setLabelsProps,
  ...props
}) => {
  return (
    <VictoryBar
      {...props}
      name={'user-slice'}
      sortKey={sortKey}
      labels={() => null}
      labelComponent={
        <EmissionsLabel
          showAverage={showAverage}
          selectedSlice={selectedSlice}
          origin={props.origin}
          setLabelsProps={setLabelsProps}
        />
      }
      style={{
        data: {
          fill: ({ datum }) => setActivityFillColor({ datum }, showAverage),
          opacity: ({ datum }) => getSliceOpacity({ selectedSlice, datum }),
        },
        labels: {
          padding: 0, //-14, // rest padding to 0
          // angle: '25',
          // verticalAnchor: 'start',
        },
      }}
      y="total"
      x="activityTypeCode"
      alignment="start"
    />
  );
};
const AverageSlices = ({
  selectedSlice,
  strokeOnly,
  showAverage,
  ...props
}) => (
  <VictoryBar
    {...props}
    sortKey={sortKey}
    style={{
      data: {
        fill: ({ datum }) =>
          strokeOnly
            ? 'none'
            : showAverage
            ? activityColor.locationAverage
            : datum.total > 0
            ? 'none'
            : activityColor.noAverageActivity,
        stroke: ({ datum }) =>
          strokeOnly && datum.averageTotalPerMonth < datum.total
            ? activityColor.locationAverageBorder
            : 'none',
        // strokeDasharray: '5, 5',
        strokeWidth: 1,
        opacity: ({ datum }) => getSliceOpacity({ selectedSlice, datum }),
      },
    }}
    x="activityTypeCode"
    y="averageTotalPerMonth"
    alignment="start"
  />
);

const ChartClick = Platform.select({
  ios: TouchableOpacity,
  android: Svg,
});

const sortKey = 'none';

const EmissionsChart = ({
  data,
  isLoading,
  showAverage,
  isSquareScale,
  onSliceSelect,
  selectedSlice,
}) => {
  const [labelsProps, setLabelsProps] = useState({});
  const { top } = useSafeAreaInsets();
  const theme = useTheme();
  const mode = 'light';
  // console.log({ labelsProps });
  // const scrollTo = useScrollTo();
  const scrollToChart = useScrollToBody({
    y: isSmallDevice ? 240 : 140 - top,
  });

  const renderLabel = (label, idx) => (
    <OverlayEmissionsLabel
      key={label.activityTypeCode}
      onLabelPress={onSliceSelect}
      selectedSlice={selectedSlice}
      showAverage={showAverage}
      {...label}
    />
  );
  const renderEmissionLabels = (labelProps) =>
    Object.values(labelProps).map((label) => renderLabel(label));

  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }

  const onSlicePress = [
    {
      target: 'data',
      eventHandlers: {
        // Note onPressIn is more reliable but prevents scrolling on Screen. Use onPress to persist taps to scrollView
        onPress: (evt, clickedProps) => {
          // console.log({ clickedProps });
          const type = clickedProps.datum.activityTypeCode;

          if (
            selectedSlice === SelectedSlices.SELECT_NONE ||
            selectedSlice !== type
          ) {
            scrollToChart();
          }

          configureLayoutAnimation({
            duration: 500,
            type: 'linear',
            style: 'opacity',
          });
          onSliceSelect((prev) =>
            prev === type ? SelectedSlices.SELECT_NONE : type
          );
          // return [
          //   {
          //     target: 'data',
          //     //childName: 'user-slice2',
          //     //eventKey: 'all',
          //     mutation: ({ datum, ...props }) => {
          //       const type = datum.activityTypeCode;
          //       onSliceSelect((prev) =>
          //         prev === type ? SelectedSlices.SELECT_NONE : type
          //       );
          //       console.log(props, datum);

          //       const fill = props.style && props.style.fill;

          //       //return { datum: { ...datum, _y: datum.total * 2 } };
          //       return fill === 'black'
          //         ? null
          //         : { style: { fill: 'black' } };
          //     },
          //   },
          // ];
        },
      },
    },
  ];

  const VictoryComboContainer = createContainer('zoom', 'voronoi');
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {/* note keep view inside view to fix positioning of labels from renderEmissionsLabels */}
      <View style={{ position: 'relative' }}>
        {renderEmissionLabels(labelsProps)}
        <ChartClick
          width={chartSize} // applies only to Svg (Android)
          height={chartSize} // applies only to Svg (Android)
          // viewBox={`0 0 ${chartSize + 70} ${chartSize}`}
          style={{ alignItems: 'center', justifyContent: 'center' }}>
          {/* // Loading will cause a animate of the graph */}
          {/* {isLoading && false ? (
          <View width={chartSize} height={chartSize} />
        ) : ( */}
          <VictoryChart
            polar
            animate={{
              duration: 1000,
              onLoad: { duration: 200 },
            }}
            scale={{ x: 'linear', y: isSquareScale ? 'sqrt' : 'linear' }}
            //domain={{ y: [0, 1500] }} // if auto scale doesn't work set max y value using domain
            width={chartSize}
            height={chartSize}
            padding={graphPadding}>
            <AverageSlices
              data={data}
              showAverage={showAverage}
              selectedSlice={selectedSlice}
            />
            <ActivitySlices
              data={data}
              showAverage={showAverage}
              selectedSlice={selectedSlice}
              setLabelsProps={setLabelsProps}
            />
            {showAverage && (
              <AverageSlices
                strokeOnly
                data={data}
                selectedSlice={selectedSlice}
              />
            )}
            <VictoryPolarAxis
              name={'polar-axis'}
              sortKey={sortKey}
              style={{
                axis: { stroke: 'none' },
                tickLabels: { fill: 'none' },
                grid: {
                  stroke: theme[mode].background.secondary,
                  strokeWidth: axisWidth,
                },
              }}
            />
            <VictoryBar // AVERAGES USED TO AUTO SCALE CHART COMPONENTS AND CLICK EVENTS
              name={'average-slice-clickable'}
              sortKey={sortKey}
              data={data}
              events={onSlicePress}
              style={{ data: { fill: 'none' } }}
              x="activityTypeCode"
              y="averageTotalPerMonth"
              alignment="start"
            />
            <VictoryBar //USER TOTALS USED TO AUTO SCALE CHART COMPONENTS AND CLICK EVENTS
              name={'user-slice-clickable'}
              data={data}
              sortKey={sortKey}
              events={onSlicePress}
              style={{ data: { fill: 'none' } }}
              y="total"
              x="activityTypeCode"
              alignment="start"
            />
          </VictoryChart>
          {/* )} */}
        </ChartClick>
      </View>
    </View>
  );
};

export default EmissionsChart;
