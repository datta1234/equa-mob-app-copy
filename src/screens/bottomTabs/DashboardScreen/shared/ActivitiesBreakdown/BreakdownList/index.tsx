import React from 'react';

import { dissoc } from 'ramda';
import styled from 'styled-components/native';

import { isNotDefined } from 'utils/ramda';

import ActivitiesList from './ActivitiesList';
import ActivityDetails from './ActivityDetails';
import Placeholder from './Placeholder';

const ActivityBreakdown = ({ activity }) => {
  const activityDetails = dissoc(['activities'], activity);

  if (isNotDefined(activity?.activities)) {
    return <Placeholder type={activity.code} />;
  }

  return (
    <Container>
      <ActivityDetails activityDetails={activityDetails} />
      <ActivitiesList activityLogs={activity.activities} type={activity.code} />
    </Container>
  );
};

export default ActivityBreakdown;

const Container = styled.View``;
