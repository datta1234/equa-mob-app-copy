import React from 'react';

import { useQuery } from '@apollo/client';
import styled from 'styled-components/native';

import {
  GET_ACTIVITIES,
  GET_ACTIVITIES_QUERY_NAME,
} from 'api/operations/queries/getActivities';
import { getInOr } from 'utils/ramda';

import ActivitiesTitleBar from './components/ActivitiesTitleBar';
import LoaderOverlay from './components/LoaderOverlay';
import Tabs from './Tabs/Tabs';

const ActivitiesBreakdown = ({ take = 7, ...rest }) => {
  const { data, loading } = useQuery(GET_ACTIVITIES, {
    fetchPolicy: 'cache-and-network',
    // pollInterval: 1500,
    variables: { take },
  });

  const activities = getInOr([], [GET_ACTIVITIES_QUERY_NAME], data);

  return (
    <Container>
      <ActivitiesTitleBar />
      {loading ? <LoaderOverlay /> : <Tabs activities={activities} />}
    </Container>
  );
};

export default ActivitiesBreakdown;

const Container = styled.View`
  align-items: center;
  /* flex: 1; */
`;
