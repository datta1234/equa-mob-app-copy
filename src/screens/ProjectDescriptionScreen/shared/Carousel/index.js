import React, { useRef, useState } from 'react';

import mockImg from 'assets/carousel_mick_image.jpg';
import mockVideoImg from 'assets/mock_video.png';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import translator from 'utils/translator';

// translator.translate(
//   'modals.projectDescription.sdgBlock.descriptions'
// )

import Slide from './Slide';

// import PropTypes from 'prop-types';

const propTypes = {};

const defaultProps = {};

const carouselWidth = Dimensions.get('window').width;
const carouselItemWidth = Dimensions.get('window').width - 100;

function ProjectCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const carouselItems = [
    {
      id: 0,
      description: translator.translate(
        'modals.projectDescription.slider.mockText'
      ),
      img: mockImg,
    },
    {
      id: 1,
      description: translator.translate(
        'modals.projectDescription.slider.mockText'
      ),
      img: mockImg,
    },
    {
      id: 2,
      description: translator.translate(
        'modals.projectDescription.slider.mockText'
      ),
      img: mockImg,
    },
  ];

  return (
    <Carousel
      layout={'default'}
      // ref={carouselRef}
      data={carouselItems}
      sliderWidth={carouselWidth}
      itemWidth={carouselItemWidth}
      renderItem={({ item, index }) => (
        <View style={{ flex: 1 }}>
          <Slide {...item} isActive={activeIndex == index} />
        </View>
      )}
      onSnapToItem={setActiveIndex}
    />
  );
}

ProjectCarousel.defaultProps = defaultProps;
ProjectCarousel.propTypes = propTypes;
export default ProjectCarousel;
