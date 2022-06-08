import React, { useState } from 'react';

import { svgs } from 'assets';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';

import { Text } from 'components/Typography';
import { activity as activityColor, icons } from 'constants/colors';
import { SCREEN_WIDTH } from 'constants/layout';
import useMainNav from 'hooks/navigation/useMainNav';
import { SelectedSlices } from 'models/SelectedSlice';
import { roundNumber } from 'utils/common';

import {
  getActivityColor,
  preventOutOfBoundsPosition,
  preventOverlappingOriginPlacement,
} from './chartHelpers';
import { chartSize } from './constants';

const LabelContainer = styled.View`
  align-items: center;
  padding-right: 10px;
  max-width: ${SCREEN_WIDTH / 2 - 20 + 'px'};
  border-radius: 30px;
  flex-direction: row;
  /* flex-wrap: wrap; */
  /* overflow: hidden; */
  background-color: ${({ color }) => color};
`;
const IconContainer = styled.View`
  align-items: center;
  padding: 8px;
  margin-right: 4px;
  border-radius: 30px;
  background-color: ${({ color }) => color};
`;
const TotalText = styled(Text).attrs({
  size: 'tiny',
})`
  color: ${({ color }) => color};
`;

const EmissionsLabel = ({
  origin,
  selectedSlice,
  showAverage,
  setLabelsProps,
  ...rest
}) => {
  // console.log('EmisionLabel Props', { size, origin, ...rest });

  const [labelLayout, setLabelLayout] = useState({
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });
  const {
    activityTypeCode,
    activityTypeTitle,
    totalPercentage,
    _x,
    _y,
    averageTotalPerMonth,
    total,
  } = rest?.datum || {};
  const initialLabelPosition = { x: rest.x, y: rest.y };

  const graphSize = { width: rest.width, height: rest.height };
  const chartOrigin = origin ?? {
    x: graphSize.width / 2,
    y: graphSize.height / 2,
  }; // estimates origin if it doesn't exist / isn't passed in by graph

  function rotatePoint(point, a) {
    const sin = Math.sin;
    const cos = Math.cos;
    const x = point[0];
    const y = point[1];

    // Rotate around Z axis
    const rotateZMatrix = [cos(a), -sin(a), sin(a), cos(a)];

    const resultX = x * cos(a) + y * -sin(a);
    const resultY = x * sin(a) + y * cos(a);
    return [resultX, resultY];
  }

  const length = rest.scale.y(_y);
  const numberOfBars = rest.data.length;
  const rotateLabelAngle = 360 / numberOfBars / 2;
  const startAngle = rest.index * (360 / numberOfBars);
  const angle = startAngle - rotateLabelAngle;
  const quadrant =
    angle > 0 && angle <= 90
      ? 1
      : angle > 90 && angle <= 180
      ? 2
      : angle > 180 && angle <= 270
      ? 3
      : 4;

  const radAngle = (angle) => angle * (Math.PI / 180);

  const startingPoint = [
    initialLabelPosition.x - chartOrigin.x,
    chartOrigin.y - initialLabelPosition.y,
  ]; //rotatePoint([length, 0], radAngle(startAngle));
  const rotatedFinalPoint = rotatePoint(
    startingPoint,
    radAngle(-rotateLabelAngle)
  );

  const finalPoint = preventOverlappingOriginPlacement(
    rotatedFinalPoint,
    labelLayout
  );

  // Shift x and y label co-ordinates by the change in position from starting to final position
  const shiftX = finalPoint[0] - startingPoint[0];
  const shiftY = startingPoint[1] - finalPoint[1];

  const shiftEmptyX = quadrant === 1 || quadrant === 4 ? 20 : -20;
  const shiftEmptyY = quadrant > 2 ? 34 : -34;

  const shouldIMove = quadrant === 2 || quadrant === 3; // OR can do rest.x < chartOrigin.x
  const addX =
    (total ? shiftX : shiftEmptyX) + (shouldIMove ? -labelLayout?.width : 0); //rest.scale.x(_x)
  const addY = (total ? shiftY : shiftEmptyY) - labelLayout?.height / 2; //rest.scale.y(_y)

  const totalText = total
    ? `${roundNumber(total, 0)} kg`
    : `+ Add ${activityTypeTitle}`;

  const labelPosition = { x: rest?.x + addX, y: rest?.y + addY };
  const excessWidth = (SCREEN_WIDTH - chartSize) / 2;
  const labelBoundary = {
    left: -excessWidth,
    right: chartSize + excessWidth - labelLayout?.width,
    top: 0,
    bottom: graphSize.height - labelLayout?.height,
  };

  const { top, left } = preventOutOfBoundsPosition(
    labelBoundary,
    labelPosition
  );

  const labelProps = {
    left,
    top,
    totalText,
    averageTotalPerMonth,
    activityTypeCode,
    total,
  };

  React.useEffect(() => {
    setLabelsProps((prev) => ({
      ...prev,
      [activityTypeCode]: labelProps,
    }));
  }, [top, left]);

  // const notSelected = !(
  //   selectedSlice === activityTypeCode ||
  //   selectedSlice === SelectedSlices.SELECT_NONE
  // );

  // if (notSelected) {
  //   return null;
  // }

  const onLayout = (event) => {
    const layout = event.nativeEvent.layout;
    const roundedLayout = {
      x: Math.round(layout?.x),
      y: Math.round(layout?.y),
      width: Math.round(layout?.width),
      height: Math.round(layout?.height),
    };

    // if (R.equals(labelLayout, roundedLayout)) {
    //   return;
    // }
    // console.log('on Label Layout called', labelLayout, roundedLayout);
    setLabelLayout(roundedLayout);
  };

  return (
    <Label onLayout={onLayout} showAverage={showAverage} {...labelProps} />
  );
};

export default EmissionsLabel;

export const OverlayEmissionsLabel = ({ selectedSlice, ...labelProps }) => {
  // const notSelected = !(
  //   selectedSlice === labelProps.activityTypeCode ||
  //   selectedSlice === SelectedSlices.SELECT_NONE
  // );

  // if (notSelected) {
  //   return null;
  // }

  return <Label {...labelProps} />;
};

export const Label = ({
  onLabelPress,
  left,
  top,
  totalText,
  onLayout,
  activityTypeCode,
  averageTotalPerMonth,
  showAverage,
  total,
}) => {
  const goTo = useMainNav();

  const onPress = () => {
    total > 0 && false // remove false to allow labels with values to control slice selection instead of navigating to add activities
      ? onLabelPress((prev) =>
          prev === activityTypeCode
            ? SelectedSlices.SELECT_NONE
            : activityTypeCode
        )
      : goTo.addActivity(activityTypeCode);
  };

  const Icon = svgs.icons.activityIcons[activityTypeCode];

  const labelBaseColor = !total
    ? activityColor.activityEmptyLabel
    : activityColor.activityLabel;

  const labelColor =
    averageTotalPerMonth < total && showAverage
      ? getActivityColor(activityTypeCode)
      : labelBaseColor;

  const iconBackgroundColor =
    averageTotalPerMonth < total && showAverage
      ? getActivityColor(activityTypeCode)
      : activityColor.activityLabel;

  const iconColor =
    averageTotalPerMonth < total && showAverage ? icons.dark : icons.light;

  const renderIcon = (iconColor) => <Icon color={iconColor} />;

  return (
    <Pressable
      // hitSlop={20}
      onLayout={onLayout}
      style={{
        padding: 0,
        position: 'absolute',
        left: left,
        top: top,
        zIndex: 100,
        // transform: transform,
      }}
      onPress={onPress}>
      <LabelContainer color={labelColor}>
        <IconContainer color={iconBackgroundColor}>
          {renderIcon(iconColor)}
        </IconContainer>
        <TotalText color={iconColor}>{totalText}</TotalText>
      </LabelContainer>
    </Pressable>
  );
};
