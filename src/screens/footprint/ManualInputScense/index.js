import React, { useRef, useState } from 'react';

import { useRoute } from '@react-navigation/core';
import { format } from 'date-fns/fp';
import {
  always,
  append,
  assoc,
  findIndex,
  length,
  map,
  pipe,
  propEq,
  when,
} from 'ramda';
import { useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';

import { renameKeys } from 'utils/ramda';

import AddFootPrintActivityForm from './AddFootprintActivityForm';
import { LoaderOverlay } from './AddFootprintActivityForm/shared';
import FootprintActivityPreview from './FootprintActivityPreview';
import { withQuery } from './hocs';
import { StyledTabBar } from './styles';

const propTypes = {};

const defaultProps = {};

function ManualInputScense({ footprintActivities }) {
  const route = useRoute();
  const tabViewRef = useRef(null);
  const layout = useWindowDimensions();

  const initialIndex = findIndex(
    propEq('id', route.params?.footprintActivityId),
    footprintActivities
  );

  const [index, setIndex] = useState(
    initialIndex != -1 ? initialIndex : length(footprintActivities)
  );

  const [routes] = pipe(
    map(renameKeys({ label: 'title' })),
    map((item) => assoc('key', item.id, item)),
    when(
      always(route.params?.activityId),
      append({
        key: 'newFootprintActivity',
        title: format('M/dd/yy h:mmaaa', new Date()),
      })
    ),
    useState
  )(footprintActivities);

  return (
    <TabView
      lazy={length(routes) > 1}
      ref={tabViewRef}
      initialLayout={layout}
      onIndexChange={setIndex}
      renderTabBar={(props) => <StyledTabBar {...props} />}
      navigationState={{ index, routes }}
      renderLazyPlaceholder={() => <LoaderOverlay />}
      renderScene={(props) => {
        if (props.route.key === 'newFootprintActivity') {
          return (
            <AddFootPrintActivityForm
              {...props}
              isActive={routes[index]?.key == props.route.key}
            />
          );
        }

        return (
          <FootprintActivityPreview
            {...props}
            isActive={routes[index]?.key == props.route.key}
          />
        );
      }}
    />
  );
}

ManualInputScense.defaultProps = defaultProps;
ManualInputScense.propTypes = propTypes;
export default withQuery(ManualInputScense);
