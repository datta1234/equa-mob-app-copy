import React, { useEffect } from 'react';
import { useCallback } from 'react';

import { gql, useQuery } from '@apollo/client';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { useFocusEffect } from '@react-navigation/native';

import { isLoggedInVar } from 'api/client/cache';
import { USER_FRAGMENT } from 'api/fragments';
import { isBoolean } from 'utils/helpers';
import { useStatusNavigation } from 'utils/me';
import permissionsService from 'utils/permissions';
import { isDefined } from 'utils/ramda';

const GET_USER_QUERY_NAME = 'GetUser';
const GET_USER = gql`
  query GetUser {
    ${GET_USER_QUERY_NAME} {
      id
      trackAnalytics
      trackCrashStatistics
    }
  }
`;

export default (WrappedComponent) => {
  return (props) => {
    const { data, loading, refetch } = useQuery(GET_USER, {
      fetchPolicy: 'network-only',
    });

    const user = data?.[GET_USER_QUERY_NAME];
    const [navToByStatus] = useStatusNavigation(user, { loading });

    async function updateFirebaseCollectionPermissions({
      trackAnalytics,
      trackCrashStatistics,
    }) {
      isBoolean(trackAnalytics) &&
        (await analytics().setAnalyticsCollectionEnabled(trackAnalytics));
      isBoolean(trackCrashStatistics) &&
        (await crashlytics().setCrashlyticsCollectionEnabled(
          trackCrashStatistics,
        ));
    }

    async function updateFirebaseCollectionPermissionsFromStorage() {
      const trackAnalytics = await permissionsService.getAnalyticsAllowed();
      const trackCrashStatistics =
        await permissionsService.getCrashStatsAllowed();

      updateFirebaseCollectionPermissions({
        trackAnalytics,
        trackCrashStatistics,
      });
    }

    useEffect(() => {
      if (loading) {
        return;
      }

      if (isDefined(user)) {
        console.log('logging in local');
        updateFirebaseCollectionPermissions(user);
        isLoggedInVar(true);
        return;
      }

      // if user is not logged in, i.e no user
      updateFirebaseCollectionPermissionsFromStorage();
      isLoggedInVar(false);
    }, [user, loading]);

    useFocusEffect(
      useCallback(() => {
        if (loading) {
          return;
        }

        navToByStatus(user, loading);
      }, [user, loading]),
    );

    useFocusEffect(
      useCallback(() => {
        refetch();
      }, [user]),
    );

    return <WrappedComponent {...props} />;
  };
};
