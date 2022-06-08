import React from 'react';

import { map } from 'ramda';
import { TouchableOpacity } from 'react-native';

import { isNotDefined } from 'utils/ramda';

import { ListCard } from './ListCard';

const ActivitiesList = ({ activityLogs, type }) => {
  const withLogActivityPressable = (WrappedComponent) => (props) => {
    if (isNotDefined(props.objectId)) {
      return <WrappedComponent {...props} />;
    }
    //TODO: change objectId to id of activity from BE and add in onPress function
    return (
      <TouchableOpacity onPress={() => {}}>
        <WrappedComponent {...props} />
      </TouchableOpacity>
    );
  };

  const PressableLogActivityItem = withLogActivityPressable(ListCard);

  const renderList = () => {
    const renderLogActivityItem = (logActivityProps) => (
      <PressableLogActivityItem
        key={logActivityProps?.id}
        type={type}
        {...logActivityProps}
      />
    );

    return <>{map(renderLogActivityItem, activityLogs)}</>;
  };

  return <>{renderList()}</>;
};

export default ActivitiesList;
