import React, { useEffect, useRef, useState } from 'react';

import { useNavigation } from '@react-navigation/core';
import { assoc, evolve, indexBy, length, map, pipe, tap } from 'ramda';
import { useWindowDimensions, View } from 'react-native';
import { InteractionManager } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';

import { getIn } from 'utils/ramda';
import translator from 'utils/translator';

import { SCREENS } from './constants';
import { Pagination, Slide, ButtonsGroup } from './shared';
import { InitialSlide } from './shared/Slide';
import { Container, StyledSafeAreaView } from './styles';

const propTypes = {};

const defaultProps = {};

const translateRoutes = map(
  evolve({
    title: translator.translate,
    subtitle: translator.translate,
  })
);

function OnboardingScreen() {
  const layout = useWindowDimensions();
  const [tabIndex, setTabIndex] = useState(0);
  const translatedRoutes = translateRoutes(SCREENS);
  const navigation = useNavigation();

  const renderScene = pipe(
    map(assoc('component', Slide)),
    indexBy(getIn('key')),
    map(getIn('component')),
    assoc('intro', InitialSlide),
    SceneMap
  )(translatedRoutes);

  const tabViewref = useRef(null);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      navigation.setOptions({ headerTitle: translator.translate('equa') });
    });
  }, []);

  return (
    <StyledSafeAreaView>
      <Container>
        <TabView
          lazy
          ref={tabViewref}
          initialLayout={layout}
          onIndexChange={setTabIndex}
          renderTabBar={() => null}
          navigationState={{
            index: tabIndex,
            routes: translatedRoutes,
          }}
          renderScene={renderScene}
        />

        <Pagination size={length(SCREENS)} paginationIndex={tabIndex} />

        <View style={{ padding: 15, backgroundColor: '#000' }}>
          <ButtonsGroup
            isVisible={tabIndex == length(SCREENS) - 1}
            goToNextSlide={() => tabViewref.current?.jumpToIndex(tabIndex + 1)}
          />
        </View>
      </Container>
    </StyledSafeAreaView>
  );
}

OnboardingScreen.defaultProps = defaultProps;
OnboardingScreen.propTypes = propTypes;
export default OnboardingScreen;
