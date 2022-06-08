import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { AppStackNavigationProp, AppStackRouteProp } from 'types/navigation';

import Swiper from './shared/Swiper';

type Props = {
  route: AppStackRouteProp<'TourScreen'>;
  navigation: AppStackNavigationProp<'TourScreen'>;
};

const defaultProps = {};
function TourScreen({}: Props) {
  return (
    <SafeArea>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'rgba(200,200,200,0.3)'}
      />
      <Swiper />
    </SafeArea>
  );
}
TourScreen.defaultProps = defaultProps;
export default TourScreen;

const SafeArea = styled(SafeAreaView).attrs({
  edges: ['bottom'],
})`
  flex: 1;
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.dark};
`;
