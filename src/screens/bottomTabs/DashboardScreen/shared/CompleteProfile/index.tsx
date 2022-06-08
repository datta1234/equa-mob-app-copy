import React, { useState, useCallback } from 'react';

import { useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import { length } from 'ramda';
import { ActivityIndicator } from 'react-native';

import {
  GET_USER_PROGRESS,
  GET_USER_PROGRESS_QUERY_NAME,
} from 'api/operations/queries/getUserProgress';
import { configureLayoutAnimation } from 'utils/helpers';

import { ProgressIndicator, WelcomeBanner } from './components';

const CompletedProfileBlock = ({ steps }) => {
  const [isWelcomeShown, setIsWelcomeShown] = useState(true);
  const { data, loading } = useQuery(GET_USER_PROGRESS, {
    fetchPolicy: 'cache-and-network',
    variables: {},
  });

  function showWelcome(time = 3000) {
    setIsWelcomeShown(true);
    setTimeout(() => {
      configureLayoutAnimation({
        duration: 600,
      });
      setIsWelcomeShown(false);
    }, time);
  }

  useFocusEffect(
    useCallback(() => {
      showWelcome(4500);
    }, [])
  );

  if (loading || !data) {
    return <ActivityIndicator style={{ paddingTop: 50, paddingBottom: 50 }} />;
  }

  const sortedData = data?.[GET_USER_PROGRESS_QUERY_NAME]?.slice()?.sort(
    (a, b) => b.isCompleted - a.isCompleted //a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? -1 : 1
  ); // sort by isCompleted

  const completed = sortedData[length(sortedData) - 1]?.isCompleted;
  const getStarted = !sortedData[0]?.isCompleted;

  return getStarted || (completed && isWelcomeShown) ? (
    <WelcomeBanner isProfileCompleted={completed} />
  ) : (
    <ProgressIndicator steps={sortedData} />
  );
};

export default CompletedProfileBlock;
