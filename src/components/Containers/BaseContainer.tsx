import React, { useState, useRef, useContext } from 'react';

import { useScrollToTop } from '@react-navigation/native';
import { ImageBackground, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import styled, { css } from 'styled-components/native';

import { images } from 'assets';
import { Header } from 'components';

import { scaleHeight } from 'constants/layout';
import { debounceFunction, throttleFunction } from 'utils/helpers';
import { renderNode } from 'utils/helpers';

const safeAreaDefaults = { bottom: true, top: true, right: true, left: true };

const ScrollRefContext = React.createContext(null);

export const useScrollTo = (offset = { x: 0, y: 0 }) => {
  let scrollTo;
  const noop = () => {};
  const { scrollRef } = useContext(ScrollRefContext) || {};

  if (scrollRef?.current == null) {
    return noop;
  }
  // generic scroll to function which can be used for various scroll components in RN (Flatlist, ScrollView, KeyboardScrollView... e.t.c.)
  if ('scrollTo' in scrollRef?.current) {
    scrollTo = ({ x, y } = offset) =>
      scrollRef?.current?.scrollTo({ x: x, y: y, animated: true });
  } else if ('scrollToPosition' in scrollRef?.current) {
    scrollTo = ({ x, y } = offset) => {
      scrollRef?.current?.scrollToPosition(x, y, true);
    };
  } else if ('getScrollResponder' in scrollRef?.current) {
    // If the view is a wrapper like FlatList, SectionList etc.
    // We need to use `getScrollResponder` to get access to the scroll responder
    const scrollable = scrollRef.current.getScrollResponder();
    if ('scrollTo' in scrollable) {
      scrollTo = ({ x, y } = offset) =>
        scrollable?.scrollTo({ x: x, y: y, animated: true });
    } else {
      scrollTo = noop;
    }
  } else {
    scrollTo = noop;
  }

  return scrollTo;
};

export const useScrollToBody = (offset = { x: 0, y: 0 }) => {
  const { bodyCords } = useContext(ScrollRefContext) || {};
  const scrollTo = useScrollTo();
  return ({ x, y } = offset) =>
    scrollTo({ x: bodyCords.x + x, y: bodyCords.y + y });
};

export const useScrollToEnd = () => {
  const noop = () => {};
  const { scrollRef } = useContext(ScrollRefContext) || {};

  if (scrollRef?.current == null) {
    return noop;
  }
  const scrollToEnd = scrollRef?.current?.scrollToEnd;
  return (animated = true) =>
    // Add delay to allow for animation to finish for animation to finish
    setTimeout(() => {
      scrollToEnd({ animated });
    }, 100);
};

export const useOnScrollEvent = () => {
  const { scrollEvent } = useContext(ScrollRefContext);
  return scrollEvent;
};
export const useOnScrollFinalEvent = () => {
  const { scrollFinalEvent } = useContext(ScrollRefContext);
  return scrollFinalEvent;
};

const trees = images.TREES_BG;

const BaseContainer = ({
  headerBar,
  title,
  subTitle,
  header,
  headerImageSource,
  persistTaps = true,
  children,
  close,
  back,
  dark,
  bodyColor,
  center,
  safeArea,
  closeToBottomCallback = () => {},
  ...scrollProps
}) => {
  const headerBarProps = { back, close };
  safeArea = { ...safeAreaDefaults, ...safeArea }; // include defaults
  const insets = useSafeAreaInsets(); // TODO: fix issue with SafeAreaView causing warning: Could not locate shadow view with tag #XXXX, this is probably caused by a temporary inconsistency between native views and shadow views. Potentially use insets directly
  const extraTopInset = insets.top ? 0 : 10;
  const extraBottomInset = insets.bottom ? 0 : 16;

  const scrollRef = useRef(null);
  // const [ref_state, setRefState] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollEvent, setScrollEvent] = useState(null);
  const [scrollFinalEvent, setFinalScrollEvent] = useState(null);
  const [bodyCords, setBodyCords] = useState([]);

  const hasHeaderImage = !!headerImageSource;

  // Use Effect with scrollRef state, to make ref stateful (Will cause re-renders)
  // React.useEffect(() => {
  //   if (!scrollRef) {
  //     return;
  //   }
  //   setRefState(scrollRef);
  // }, []);

  const paddingToBottom = 20;
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onScroll = ({ nativeEvent }) => {
    //TODO: move onScroll functions out of base container and into OnScroll Container
    // Debounce is used to prevent rerenders as setting state will cause a rerender on every scroll interval.
    //onScroll is called at most once per frame or ever x number of ms if scrolEvent Throttling is set
    debounceFunction(() => {
      setFinalScrollEvent(nativeEvent);
    }, 150);
    //throttleFunction(() => setScrollEvent(nativeEvent), 500);

    if (isCloseToBottom(nativeEvent)) {
      closeToBottomCallback(nativeEvent);
    }
  };

  useScrollToTop(scrollRef); // used by React Navigation
  return (
    <AwareScrollView
      ref={scrollRef}
      persistTaps={persistTaps}
      onScroll={onScroll}
      scrollEventThrottle={20}
      onScrollAnimationEnd={() => {
        setIsScrolling(false);
      }}
      onMomentumScrollBegin={() => {
        setIsScrolling(true);
      }}
      onMomentumScrollEnd={() => {
        setIsScrolling(false);
      }}
      {...scrollProps}>
      <ScreenContainer dark={dark}>
        <StatusBar barStyle="default" />
        <LinearHeader>
          <Background
            hasHeaderImage={hasHeaderImage}
            source={headerImageSource ?? trees}
            resizeMode={hasHeaderImage ? 'cover' : 'contain'}>
            {safeArea.top && <SafeAreaTop extraInset={extraTopInset} />}

            {headerBar ? (
              renderNode(headerBar)
            ) : (
              <Header.Bar {...headerBarProps} />
            )}
            <Header title={title} subTitle={subTitle}>
              {header}
            </Header>
          </Background>
        </LinearHeader>

        <BodyContainer
          center={center}
          onLayout={(event) => setBodyCords(event.nativeEvent.layout)}
          dark={dark}
          bodyColor={bodyColor}>
          {/* All children of BaseContainer receive scrollRef and Scroll contexts */}
          <ScrollRefContext.Provider
            value={{ scrollRef, bodyCords, scrollEvent, scrollFinalEvent }}>
            {children}
          </ScrollRefContext.Provider>
          {safeArea.bottom && <SafeAreaBottom extraInset={extraBottomInset} />}
        </BodyContainer>
      </ScreenContainer>
    </AwareScrollView>
  );
};

export default BaseContainer;

const ScreenContainer = styled.View`
  background-color: ${({ theme, mode = 'light', dark }) =>
    theme[mode].background[dark ? 'dark' : 'primary']};
  flex: 1;
`;
// TODO: selectively choose ScrollView or KeyboardAwareScrollView
const AwareScrollView = styled(KeyboardAwareScrollView).attrs(
  ({ persistTaps, ...rest }) => ({
    showsVerticalScrollIndicator: false,
    //keyboardOpeningTime: Number.MAX_SAFE_INTEGER, // Fixes scroll view bounce bug when changing input focus.
    keyboardShouldPersistTaps: persistTaps ? 'handled' : 'never',
    bounces: false,
    contentContainerStyle: {
      flexGrow: 1,
      // justifyContent: 'space-between',
    },
    ...rest,
  }),
)``;
const BodyContainer = styled.View.attrs({
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: -1,
  //   },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 4.41,
  //   elevation: 2,
})`
  flex: 1;
  margin-top: -60px;
  background-color: ${({ theme, mode = 'light', dark, bodyColor }) =>
    theme[mode ?? theme.mode].background[
      dark ? 'dark' : bodyColor ?? 'primary'
    ]};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  align-items: ${({ center }) => (center ? 'center' : 'stretch')};
`;

const Background = styled(ImageBackground).attrs({
  // style: {
  //   width: '100%',
  //   overflow: 'hidden', // prevent image overflow the container
  // },
  // imageStyle: {
  //   resizeMode: 'contain',
  //   height: 200,
  //   top: undefined,
  //   bottom: 0,
  // },
})`
  ${({ hasHeaderImage }) => css`
    min-height: ${scaleHeight(hasHeaderImage ? 185 : 150) + 'px'};
    padding-bottom: 60px;
    width: undefined;
    /* width: 100%; */
    justify-content: center;
  `}
`;

const LinearHeader = styled(LinearGradient).attrs(
  ({ theme, mode = 'light' }) => ({
    colors: theme[mode].background.linear,
  }),
)`
  /* padding-bottom: 30px; */ /* Used if a negative margin is applied to body */
  /* flex: 1; */
`;

const SafeAreaTop = styled(SafeAreaView).attrs({ edges: ['top'] })`
  padding-bottom: ${({ extraInset }) => extraInset + 'px'};
`;

const SafeAreaBottom = styled(SafeAreaView).attrs({
  mode: 'margin',
  edges: ['bottom'],
})`
  margin-top: ${({ extraInset }) => extraInset + 'px'};
`;
