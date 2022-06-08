import React from 'react';

import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { length } from 'ramda';
import { BallIndicator } from 'react-native-indicators';

import { colors } from 'constants/';
import useToggle from 'hooks/useToggle';
import permissionsService from 'utils/permissions';

import { useGetUserPermissions, useUpdateUserPermissions } from '../hooks';

import {
  Container,
  PermissionsContainer,
  PermissionContainer,
  Row,
  ItemType,
  Title,
  Description,
  SaveButton,
  LoadingContainer,
  PermissionSwitch,
} from './permissions.styles';

const Permission = ({ item, isFirst, isLast }) => (
  <PermissionContainer isFirst={isFirst} isLast={isLast}>
    <Row onPress={item.onPress}>
      <ItemType>
        <Title level={4} color={'primary'}>
          {item.title}
        </Title>
        <Description>{item?.description}</Description>
      </ItemType>
      <PermissionSwitch
        value={item?.switchValue}
        onValueChange={item?.onSwitchChange}
      />
    </Row>
  </PermissionContainer>
);

const Permissions = ({ permissions }) => {
  const [dirty, toggleDirty] = useToggle(false);
  const [trackAnalytics, setTrackAnalytics] = useToggle(
    permissions?.trackAnalytics
  );
  const [trackCrashStatistics, setTrackCrashStatistics] = useToggle(
    permissions?.trackCrashStatistics
  );

  const onPermissionsUpdate = () => {
    permissionsService.setCrashStatsAllowed(trackCrashStatistics);
    crashlytics().setCrashlyticsCollectionEnabled(trackCrashStatistics);
    permissionsService.setAnalyticsAllowed(trackAnalytics);
    analytics().setAnalyticsCollectionEnabled(trackAnalytics);
    // crashlytics().isCrashlyticsCollectionEnabled
    toggleDirty(false);
  };

  const [updateUserPermissions, { loading }] = useUpdateUserPermissions({
    onCompleted: onPermissionsUpdate,
  });

  const switchAnalytics = (val) => {
    toggleDirty(true);
    setTrackAnalytics(val);
  };
  const switchCrashStatistics = (val) => {
    toggleDirty(true);
    setTrackCrashStatistics(val);
  };

  const updatePermissions = () => {
    updateUserPermissions({
      variables: {
        trackAnalytics: trackAnalytics,
        trackCrashStatistics: trackCrashStatistics,
      },
    });
  };

  const menuList = [
    {
      key: 1,
      title: 'Analytics',
      description:
        'Understanding how you use the app so that we can improve your user experience.',
      switchValue: trackAnalytics,
      onSwitchChange: switchAnalytics,
    },
    {
      key: 2,
      title: 'Performance Tracking',
      description:
        'Reporting of error and crash data to improve the performance and stability of our app.',
      switchValue: trackCrashStatistics,
      onSwitchChange: switchCrashStatistics,
    },
  ];
  return (
    <Container>
      <PermissionsContainer>
        {menuList.map((item, idx) => (
          <Permission
            key={item.key}
            item={item}
            isFirst={idx === 0}
            isLast={idx + 1 === length(menuList)}
          />
        ))}
      </PermissionsContainer>
      {dirty && (
        <SaveButton isLoading={loading} onPressHandler={updatePermissions} />
      )}
    </Container>
  );
};

const PermissionsLoading = () => {
  return (
    <LoadingContainer>
      <BallIndicator size={30} color={colors.NAVY} />
    </LoadingContainer>
  );
};

const PermissionsBlock = () => {
  const { data, loading } = useGetUserPermissions();

  return (
    <>{loading ? <PermissionsLoading /> : <Permissions permissions={data} />}</>
  );
};

export default PermissionsBlock;
