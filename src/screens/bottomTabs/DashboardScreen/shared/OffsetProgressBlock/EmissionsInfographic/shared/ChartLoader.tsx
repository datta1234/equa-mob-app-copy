import React from 'react';

import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { SCREEN_WIDTH } from 'constants/layout';
import withFadeIn from 'hocs/withFadeIn';

const axisStroke = 3;

const Axises = ({ size }) => (
  <View
    style={{
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      top: 50,
      zIndex: 10,
    }}>
    <View
      style={{ width: axisStroke, height: size / 2, backgroundColor: 'white' }}
    />
    <View
      style={{ width: size, height: axisStroke, backgroundColor: 'white' }}
    />
    <View
      style={{ width: axisStroke, height: size / 2, backgroundColor: 'white' }}
    />
  </View>
);

function ChartLoader() {
  const size = 180;
  return (
    <View>
      <Axises size={size} />
      <SkeletonPlaceholder style={s.container}>
        <View style={s.breakdown}>
          <SkeletonPlaceholder.Item
            width={SCREEN_WIDTH - 200}
            height={15}
            borderRadius={10}
            marginTop={18}
          />
          <SkeletonPlaceholder.Item
            width={size}
            height={size}
            borderRadius={size}
            marginTop={15}
          />

          <SkeletonPlaceholder.Item marginTop={30} marginBottom={25}>
            <SkeletonPlaceholder.Item
              width={SCREEN_WIDTH - 80}
              height={40}
              borderRadius={15}
            />
          </SkeletonPlaceholder.Item>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
}

export default withFadeIn(ChartLoader);

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
