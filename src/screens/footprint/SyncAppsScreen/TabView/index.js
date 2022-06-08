import React, { useEffect, useRef, useState } from 'react';

import { useRoute } from '@react-navigation/core';
import { format } from 'date-fns';
import {
  always,
  append,
  findIndex,
  map,
  pipe,
  prepend,
  propEq,
  toLower,
  when,
} from 'ramda';
import { TabView, SceneMap } from 'react-native-tab-view';

import { isNotDefined, renameKeys } from 'utils/ramda';

import SyncAppScreen from '..';

import { travel, SYNC_APPS } from './constants';
import { withQuery } from './hocs';
import { StyledTabBar } from './styles';

const propTypes = {};

const defaultProps = {};

// const initialLayout = { width: Dimensions.get('window').width, height: 250 };

function SyncAppsTabs({ activities }) {
  const route = useRoute();

  const activityId = route.params?.activityId;

  const initialIndex = findIndex(propEq('id', activityId), activities);

  const [index, setIndex] = useState(initialIndex + 1);

  const [routes] = pipe(
    map(renameKeys({ id: 'key' })),
    prepend({
      key: 'mostPopular',
      title: 'Most Popular',
    }),
    useState
  )(activities);

  const tabViewRef = useRef(null);

  return (
    <TabView
      ref={tabViewRef}
      navigationState={{ index, routes }}
      renderScene={(props) => {
        if (props.route.key == 'mostPopular') {
          return <SyncAppScreen {...props} data={travel} />;
        }

        if (isNotDefined(SYNC_APPS[toLower(props.route.title)])) {
          return null;
        }

        return (
          <SyncAppScreen
            {...props}
            data={SYNC_APPS[toLower(props.route.title)]}
          />
        );
      }}
      onIndexChange={setIndex}
      // initialLayout={initialLayout}
      renderTabBar={StyledTabBar}
    />
  );
}

SyncAppsTabs.defaultProps = defaultProps;
SyncAppsTabs.propTypes = propTypes;
export default withQuery(SyncAppsTabs);
