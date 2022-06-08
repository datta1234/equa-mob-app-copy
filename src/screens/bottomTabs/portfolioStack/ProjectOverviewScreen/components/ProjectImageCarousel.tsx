import React from 'react';

import { View, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import { scale, SCREEN_WIDTH } from 'constants/layout';

const renderItem = ({ item }, parallaxProps) => {
  return (
    <View style={s.imageContainer}>
      <Image source={{ uri: item?.url }} resizeMode="cover" style={s.image} />
    </View>
  );
};

const ProjectImageCarousel = ({ imageMedia }) => {
  return (
    <View style={s.carousel}>
      <Carousel
        firstItem={1}
        data={imageMedia}
        renderItem={renderItem}
        sliderWidth={SCREEN_WIDTH}
        sliderHeight={SCREEN_WIDTH}
        itemWidth={scale(230)}
        inactiveSlideOpacity={0.6}
      />
    </View>
  );
};

export default ProjectImageCarousel;

const s = StyleSheet.create({
  image: {
    flex: 1,
    width: scale(220),
    borderRadius: scale(6),
  },
  carousel: {
    backgroundColor: '#f7f7f7',
    paddingVertical: scale(12),
    marginBottom: scale(15),
  },
  imageContainer: {
    width: scale(230),
    height: scale(170),
    alignItems: 'center',
  },
});
