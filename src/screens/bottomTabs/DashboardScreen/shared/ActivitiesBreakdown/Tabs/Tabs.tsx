import React, { useEffect, useRef, useState } from 'react';

import { useRoute } from '@react-navigation/core';
import { assoc, findIndex, length, map, pipe, propEq } from 'ramda';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import { getIn } from 'utils/ramda';

import useSelectedSlice from '../../../hooks/useSelectedSlice';

import Breakdown from '../BreakdownList';

import { StyledTabBar } from './StyledTabBar';
import { SelectedSlices } from 'models/SelectedSlice';

function Tabs({ children, activities }) {
  const route = useRoute();
  const [selectedSlice, setSelectedSlice] = useSelectedSlice();
  const tabViewRef = useRef(null);
  const layout = useWindowDimensions();

  const [routes] = pipe(
    map((item) => assoc('key', item.code, item)),
    useState
  )(activities);

  const initialIndex = findIndex(
    propEq('code', route.params?.activityCode),
    activities
  );

  const [index, setIndex] = useState(initialIndex != -1 ? initialIndex : 0);

  const properChildren = children?.filter((v) => !!v);

  const scenes = {};
  for (let i = 0; i < properChildren?.length; i += 1) {
    const item = properChildren[i];
    scenes[item.key] = item.render;
  }

  const localRenderScene = SceneMap(scenes);

  const renderScene = (props) => {
    const activity = getIn('route', props);

    return <Breakdown activity={activity} />;
  };

  const onIndexChange = (idx) => {
    setSelectedSlice(routes[idx].key); // show / hide infographic slice
    setIndex(idx); // set active tab (Controlled component): navigation state needs to be updated when onIndexChange called, otherwise the change is dropped.
  };

  // set selected tab when infographic slice selection changes
  const selectedIndex = findIndex(propEq('key', selectedSlice), routes);
  useEffect(() => {
    if (selectedIndex != -1 && selectedIndex !== index) {
      setIndex(selectedIndex);
    }
  }, [selectedIndex]);

  return (
    <TabView
      lazy={length(routes) > 1}
      ref={tabViewRef}
      initialLayout={{ width: layout.width }}
      onIndexChange={onIndexChange}
      renderTabBar={(props) => (
        <StyledTabBar
          selectedSlice={selectedSlice}
          setSelectedSlice={setSelectedSlice}
          {...props}
        />
      )}
      navigationState={{ index, routes }}
      //renderLazyPlaceholder={() => <LoaderOverlay />}
      renderScene={renderScene || localRenderScene}
      style={{ width: '100%' }}
    />
  );
}

const propTypes = {};
const defaultProps = {};

Tabs.defaultProps = defaultProps;
Tabs.propTypes = propTypes;
export default Tabs;
