import { activity as activityColor } from 'constants/colors';

import { axisWidth } from './constants';

export const getActivityColor = (activityTypeCode) => {
  switch (activityTypeCode) {
    case 'HOME':
      return activityColor.home;
    case 'FOOD':
      return activityColor.food;
    case 'TRAVEL':
      return activityColor.travel;
    case 'PURCHASE':
      return activityColor.purchase;
    default:
      return activityColor.default;
  }
};

export const setActivityFillColor = ({ datum }, showAverage) => {
  if (datum.averageTotalPerMonth < datum.total && showAverage) {
    return activityColor.activityOverAverage;
  } else {
    return getActivityColor(datum.xName);
  }
};

export const preventOverlappingOriginPlacement = (
  initialPoint,
  labelLayout
) => {
  let updatedX = initialPoint[0];
  let updatedY = initialPoint[1];
  if (
    Math.abs(initialPoint[0]) < labelLayout.width &&
    Math.abs(initialPoint[1]) < labelLayout.height / 2 + axisWidth &&
    Math.abs(initialPoint[1]) > 0.001 // label falls on x-axis, allowing for binary rounding errors
  ) {
    updatedX = Math.sign(initialPoint[0]) * axisWidth; // shift x by width of axis
    updatedY =
      Math.sign(initialPoint[1]) * (labelLayout.height / 2 + axisWidth); // shift y by half the height of the label + axisWidth
  }
  return [updatedX, updatedY];
};

export const preventOutOfBoundsPosition = (labelBoundary, labelPosition) => {
  let left = 0;
  let top = 0;

  if (labelPosition.x < labelBoundary.left) {
    left = labelBoundary.left;
  } else if (labelPosition.x > labelBoundary.right) {
    left = labelBoundary.right;
  } else {
    left = labelPosition.x;
  }

  if (labelPosition.y < labelBoundary.top) {
    top = labelBoundary.top;
  } else if (labelPosition.y > labelBoundary.bottom) {
    top = labelBoundary.bottom;
  } else {
    top = labelPosition.y;
  }

  return { left: Math.round(left), top: Math.round(top) };
};
