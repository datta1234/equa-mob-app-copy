import React from 'react';

import { svgs } from 'assets/';
import { ErrorIcon, SuccessIcon } from 'assets/svgs/status';

import { colors } from 'constants/';
import { roundNumber } from 'utils/common';

import {
  Container,
  StatusContainer,
  StatusText,
  InfoContainer,
  IconContainer,
  InfoText,
  PercentageText,
} from './activityDetails.styles';

const Status = ({ isAboveAverage }) => {
  const renderIcon = () => {
    const Icon = isAboveAverage ? ErrorIcon : SuccessIcon;
    return (
      <IconContainer
        color={isAboveAverage ? colors.status.error : colors.status.success}>
        <Icon />
      </IconContainer>
    );
  };
  const renderText = () => {
    const text = isAboveAverage
      ? 'You are currently above the average!'
      : 'You are currently under the average! ';
    return <StatusText>{text}</StatusText>;
  };

  return (
    <StatusContainer>
      {renderIcon()}
      {renderText()}
    </StatusContainer>
  );
};

const ActivityInfo = ({ percentage, activityTypeCode = 'HOME' }) => {
  const ActivityIcon = svgs.icons.activityIcons?.[activityTypeCode]; //activityTypeCode

  return (
    <InfoContainer>
      <ActivityIcon color={colors.icons.dark} />
      <PercentageText>{` = ${roundNumber(percentage, 0)}% `}</PercentageText>
      <InfoText>{'of total CO2e activity'}</InfoText>
    </InfoContainer>
  );
};

const ActivityDetails = ({ activityDetails }) => {
  const { isAboveAverage, code, totalPercentage } = activityDetails || {};
  return (
    <Container>
      <Status isAboveAverage={isAboveAverage} />
      <ActivityInfo activityTypeCode={code} percentage={totalPercentage} />
    </Container>
  );
};

export default ActivityDetails;
