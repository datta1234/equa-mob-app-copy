import React from 'react';

import MaskedView from '@react-native-community/masked-view';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import Button from 'components/Button';
import { Text } from 'components/Typography';
import { AUTH_NAVIGATOR } from 'constants/routes';

import { TOUR_DATA } from '../constants';

import {
  PressableStyled,
  ContentContainer,
  ContentItemContainer,
} from './styles';
import TourCard from './TourCard';

const propTypes = {};

const defaultProps = {};

const { width, height } = Dimensions.get('window');

const AuthNavigator = AUTH_NAVIGATOR.NAME;
const SignUpScreen = AUTH_NAVIGATOR.SIGN_UP_SCREEN.NAME;

const lastIndex = TOUR_DATA.length - 1;

function TourSwiper() {
  const navigation = useNavigation();
  const scrollRef = React.useRef(null);
  const insets = useSafeAreaInsets();

  const goToWelcome = () => {
    navigation.replace(AuthNavigator, { screen: SignUpScreen });
  };

  const goToNextIndex = (index) => {
    const currentIndex = scrollRef.current?.getCurrentIndex();
    const nextScrollIndex = currentIndex + 1;
    const scrollIndex =
      nextScrollIndex > lastIndex ? lastIndex : nextScrollIndex;
    const nextIndex = index + 1;
    scrollRef.current?.scrollToIndex({ index: nextIndex });
  };
  const goToNextScreen = (index) => {
    index === lastIndex ? goToWelcome() : goToNextIndex(index);
  };

  const SkipButton = () => (
    <PressableStyled insets={insets} hitSlop={20} onPress={goToWelcome}>
      <Text bold type={'primary'} size={'tiny'}>
        {'SKIP'}
      </Text>
    </PressableStyled>
  );

  const renderSwiperItem = ({ item, index }) => (
    <View style={s.swiperItemContainer} key={index}>
      <SkipButton />
      <MaskedView
        style={{ height: (height * 13) / 18 }}
        maskElement={
          <LinearGradient
            locations={[0.8, 0.93]}
            colors={['#FFFFFF', '#FFFFFF00']}
            style={s.imageContainer}
          />
        }>
        <Image source={item.image} style={s.image} />
      </MaskedView>

      <ContentContainer>
        <ContentItemContainer>
          <TourCard data={item} index={index} />
        </ContentItemContainer>
      </ContentContainer>
      <ContentContainer>
        <Button
          // isOutline
          textColor={'primary'}
          onPressHandler={() => goToNextScreen(index)}>
          {index === 2 ? 'Get Started' : 'Next'}
        </Button>
      </ContentContainer>
    </View>
  );

  return (
    <View style={s.container}>
      <SwiperFlatList
        ref={scrollRef}
        autoplay
        //autoplayLoop
        paginationStyleItem={s.swiperPaginationStyleItem}
        paginationStyle={s.swiperPaginationStyle}
        showPagination
        autoplayDelay={10}
        data={TOUR_DATA}
        renderItem={renderSwiperItem}
      />
    </View>
  );
}

TourSwiper.defaultProps = defaultProps;
TourSwiper.propTypes = propTypes;
export default TourSwiper;

// styles
const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    width,
    height: (height * 2) / 3,
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  swiperItemContainer: {
    flex: 1,
    width,
    position: 'relative',
  },
  swiperPaginationStyle: {
    marginVertical: 15,
  },
  swiperPaginationStyleItem: {
    width: 10,
    height: 10,
    marginHorizontal: 20,
  },
});
