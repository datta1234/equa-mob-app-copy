import React, { useState, useRef } from 'react';

import { useRoute } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import CreditsBlock from './CreditsBlock';
import DebtBlock from './DebtBlock';
import TestimonialBlock from './TestimonialBlocks';

import EmissionsInfographic from './EmissionsInfographic';
import TabBar from './TabBar';

const propTypes = {};

const defaultProps = {};
function OffsetProgressBlock() {
  const route = useRoute();
  const initialIndex = route?.params?.initialIndex;
  const tabViewRef = useRef(null);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(initialIndex ?? 0);
  const [routes] = useState([
    { key: 'emissions', title: 'My Overall Emissions' },
    // { key: 'offsets', title: 'My Offsets' },
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <TabView
        ref={tabViewRef}
        ContainerStyle={{}}
        style={{}}
        initialLayout={layout}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderTabBar={(props) => <TabBar {...props} />}
        renderScene={SceneMap({
          emissions: EmissionsInfographic,
          offsets: EmissionsInfographic,
        })}
      />

      {/* <TestimonialBlock>
        <DebtBlock />
        <CreditsBlock />
      </TestimonialBlock> */}
    </>
  );
}

OffsetProgressBlock.defaultProps = defaultProps;
OffsetProgressBlock.propTypes = propTypes;
export default OffsetProgressBlock;
