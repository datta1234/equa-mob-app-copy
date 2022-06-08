import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from 'assets';
import { scale } from 'constants/layout';

const linear = {
  locations: [0.15, 0.55, 0.75, 1],
  colors: [
    'rgba(255, 255, 255, 0.8)',
    'rgba(29, 51, 71, 0.2)',
    'rgba(80, 203, 153, 0.2)',
    'rgba(27, 163, 166, 0.2)',
  ],
};

function MaintenanceContainer({ children }) {
  const background = images.backgrounds.update;

  return (
    <ImageBackground source={background} style={s.backgroundImage}>
      <LinearGradient
        locations={linear.locations}
        colors={linear.colors}
        style={s.root}>
        {/* <View style={s.overlay}> */}
        <SafeAreaView style={s.content}>{children}</SafeAreaView>
        {/* </View> */}
      </LinearGradient>
    </ImageBackground>
  );
}

export default MaintenanceContainer;

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    //     position: 'relative',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(29, 51, 71, 0.15)',
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
