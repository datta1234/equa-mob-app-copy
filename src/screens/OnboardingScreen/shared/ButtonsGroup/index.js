import React, { useEffect, useRef, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { map } from 'ramda';

// import { StyleSheet, Animated, InteractionManager, View } from 'react-native';

import Button from 'components/Button';
import {
  AUTH_NAVIGATOR,
  SIGN_UP_NAVIGATOR,
  SIGN_IN_NAVIGATOR,
} from 'constants/routes';
import translator from 'utils/translator';

import { withFadeIn } from '../../hocs';

import { Container, ButtonItems, ButtonItem } from './styles';

const propTypes = {};

const defaultProps = {};

const renderButton = (options) => {
  return (
    <ButtonItem>
      <Button {...options} onPressHandler={options.handler}>
        {options.title}
      </Button>
    </ButtonItem>
  );
};
const renderButtons = map(renderButton);

const AuthButtons = withFadeIn(() => {
  const navigation = useNavigation();

  const AUTH_BUTTONS = [
    {
      id: 0,
      title: translator.translate('onboarding.buttons.signIn'),
      mode: 'dark',
      handler: () =>
        navigation.navigate(AUTH_NAVIGATOR.NAME, {
          screen: SIGN_IN_NAVIGATOR.NAVIGATOR_NAME.NAME,
          params: { screen: SIGN_IN_NAVIGATOR.SCREENS.CREDENTIALS_FORM.NAME },
        }),
    },
    {
      id: 1,
      title: translator.translate('onboarding.buttons.connect'),
      handler: () =>
        navigation.navigate(AUTH_NAVIGATOR.NAME, {
          screen: SIGN_UP_NAVIGATOR.NAVIGATOR_NAME.NAME,
          params: { screen: SIGN_UP_NAVIGATOR.SCREENS.CREDENTIALS_FORM.NAME },
        }),
    },
  ];

  return <ButtonItems>{renderButtons(AUTH_BUTTONS)}</ButtonItems>;
});

const TabViewNavButtons = withFadeIn(({ goToNextSlide }) => {
  return (
    <ButtonItems>
      {/* <Button>
        <LeftIcon />
      </Button> */}

      <ButtonItem>
        <Button activeOpacity={0.85} onPressHandler={goToNextSlide}>
          {translator.translate('onboarding.buttons.nextButton')}
        </Button>
      </ButtonItem>
    </ButtonItems>
  );
});
function ButtonsGroup({ isVisible, goToNextSlide }) {
  // console.log('AUTH_NAVIGATOR.NAME', AUTH_NAVIGATOR.NAME);
  const [showNext, setShowNext] = useState(true);

  // const animatedOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      setShowNext(false);
    }
    if (!isVisible) {
      setShowNext(true)
    }
  }, [isVisible]);

  // useEffect(() => {
  //   InteractionManager.runAfterInteractions(() => {
  //     Animated.timing(animatedOpacity, {
  //       toValue: isVisible ? 1 : 0,
  //       duration: 750,
  //       useNativeDriver: true,
  //     }).start();
  //   });
  // }, [isVisible, animatedOpacity]);

  return (
    <Container style={{ position: 'relative' }}>
      {showNext ? (
        <TabViewNavButtons goToNextSlide={goToNextSlide} />
      ) : (
        <AuthButtons />
      )}
    </Container>
  );
}

ButtonsGroup.defaultProps = defaultProps;
ButtonsGroup.propTypes = propTypes;
export default ButtonsGroup;
