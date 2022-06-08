import React from 'react';

import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { SCREEN_WIDTH } from 'constants/layout';
import withFadeIn from 'hocs/withFadeIn';

const tabs = [1, 2, 3, 4];

function LoaderOverlay() {
  return (
    <SkeletonPlaceholder style={s.container}>
      <View style={s.tabs}>
        {tabs.map((i) => (
          <SkeletonPlaceholder.Item
            key={i}
            width={(SCREEN_WIDTH - 200) / 3}
            height={20}
            borderRadius={5}
            marginBottom={20}
          />
        ))}
      </View>
      <View style={s.breakdown}>
        <SkeletonPlaceholder.Item
          width={SCREEN_WIDTH - 120}
          height={35}
          borderRadius={20}
          marginBottom={16}
        />

        <SkeletonPlaceholder.Item
          width={SCREEN_WIDTH - 160}
          height={25}
          borderRadius={10}
        />

        <SkeletonPlaceholder.Item marginTop={25}>
          <SkeletonPlaceholder.Item
            width={SCREEN_WIDTH - 40}
            height={80}
            borderRadius={15}
          />
          <SkeletonPlaceholder.Item
            marginTop={10}
            width={SCREEN_WIDTH - 40}
            height={80}
            borderRadius={15}
          />
          <SkeletonPlaceholder.Item
            marginTop={10}
            width={SCREEN_WIDTH - 40}
            height={80}
            borderRadius={15}
          />
        </SkeletonPlaceholder.Item>
      </View>
    </SkeletonPlaceholder>
  );
}

export default withFadeIn(LoaderOverlay);

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdown: {
    // borderBottomWidth: 1,
    alignItems: 'center',
  },
});
