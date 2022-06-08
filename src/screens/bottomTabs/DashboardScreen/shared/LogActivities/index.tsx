import React from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { map } from 'ramda';
import { TouchableOpacity } from 'react-native';

import { ACTIVITIES_TYPES } from 'constants/logActivities';
import {
  ROOT_NAVIGATOR,
  FOOTPRINT_NAVIGATOR,
  ADD_ACTIVITY_NAVIGATOR,
  MAIN_NAVIGATOR,
} from 'constants/routes';
import { isNotDefined } from 'utils/ramda';

import { withActivityLogsQuery } from './hocs';
// import List from './List';
import { Placeholder, Header, ActivityLogs } from './shared';
import { Container } from './styles';

const propTypes = {};

const defaultProps = {};

function LatestActivity({ activityLogs }) {
  const navigation = useNavigation();
  const navToFootPrintActivityPreview = (footprintActivityId) => {
    navigation.navigate(MAIN_NAVIGATOR.NAME, {
      screen: ADD_ACTIVITY_NAVIGATOR.NAME,
      params: {
        screen: FOOTPRINT_NAVIGATOR.NAVIGATOR_NAME.NAME,
        params: {
          screen: FOOTPRINT_NAVIGATOR.SCREENS.MANUAL_FORM_SCREEN.NAME,
          params: {
            footprintActivityId,
          },
        },
      },
    });
  };

  const navToProjectDescriptionModal = (projectId) => {
    navigation.navigate(ROOT_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.SCREENS.PROJECT_DESCRIPTION_MODAL.NAME,
      params: {
        project: {
          id: projectId,
        },
      },
    });
  };

  const switchHandler = (type, objectId) => {
    if (type === ACTIVITIES_TYPES.activity || type === ACTIVITIES_TYPES.habit) {
      navToFootPrintActivityPreview(objectId);
      return;
    }

    if (type === ACTIVITIES_TYPES.project) {
      navToProjectDescriptionModal(objectId);
      return;
    }
  };

  const withLogActivityPressable = (WrappedComponent) => (props) => {
    if (isNotDefined(props.objectId)) {
      return <WrappedComponent {...props} />;
    }

    return (
      <TouchableOpacity
        onPress={() => switchHandler(props.typeCode, props.objectId)}>
        <WrappedComponent {...props} />
      </TouchableOpacity>
    );
  };

  const PressableLogActivityItem = withLogActivityPressable(ActivityLogs.Item);

  const renderList = () => {
    if (isNotDefined(activityLogs)) {
      return <Placeholder />;
    }

    const renderLogActivityItem = (logActivityProps) => (
      <PressableLogActivityItem
        key={logActivityProps?.id}
        {...logActivityProps}
      />
    );

    return (
      <ActivityLogs>{map(renderLogActivityItem, activityLogs)}</ActivityLogs>
    );
  };

  return (
    <Container>
      <Header />

      {renderList()}
    </Container>
  );
}

LatestActivity.defaultProps = defaultProps;
LatestActivity.propTypes = propTypes;
export default withActivityLogsQuery(LatestActivity);
