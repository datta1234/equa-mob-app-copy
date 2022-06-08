import React, { useRef, useState } from 'react';

import { Animated } from 'react-native';

import { Container } from './animatedButton.styles';
import { ButtonContent, ButtonContainer, LoadingIndicator } from './common';

const AnimatedButton = ({
  buttonWidth,
  buttonHeight,
  buttonBorderRadius,
  style, // styles passed in by styled(Button)

  mode,
  children,
  title,
  level,
  textColor,
  fontSize,
  isLoading,
  loadingColor,
  isOutline,
  round,
  numberOfLines,
  color,
  leftIcon,
  rightIcon,
  disabled,
  ...rest
}) => {
  const minHeight = 45;
  const minWidth = 45;
  const width = buttonWidth < minWidth ? minWidth : buttonWidth;
  const height = buttonHeight < minHeight ? minHeight : buttonHeight;
  const borderRadius = buttonBorderRadius ?? round ? 60 : 15;
  const loadingAnim = {
    width: useRef(new Animated.Value(width)).current,
    borderRadius: useRef(new Animated.Value(borderRadius)).current,
    opacity: useRef(new Animated.Value(1)).current,
  };
  const [isDisabledDelay, setIsDisabledDelay] = useState(false);

  React.useLayoutEffect(() => {
    if (isLoading && width >= height) {
      setIsDisabledDelay(true); // disabled button when loading
      //(isLoading && buttonLayout.width > 0)
      loadingAnimation(width, height, borderRadius, height / 2, 1, 0);
    } else if (width) {
      setTimeout(() => setIsDisabledDelay(false), 1000); // delay the enabling of button
      loadingAnimation(height, width, height / 2, borderRadius, 0, 1, 400); // note 500 second delay to allow for initial animation to finish

      // setTimeout(() => {
      //   loadingAnimation(height, width, height, buttonBorderRadius / 2, 0, 1);
      // }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // if (isLoading && width > 0) {
  //   loadingAnimation(width, height, height, height / 2, 1, 0);
  // } else if (width) {
  //   setTimeout(() => {
  //     loadingAnimation(height, width, height, height / 2, 0, 1);
  //   }, 300);
  // }

  function loadingAnimation(
    widthStart,
    widthEnd,
    borderRadiusStart,
    borderRadiusEnd,
    opacityStart,
    opacityEnd,
    delay = 0
  ) {
    // eslint-disable-next-line no-underscore-dangle
    if (loadingAnim.width._value !== widthEnd) {
      loadingAnim.width.setValue(widthStart);
      loadingAnim.opacity.setValue(opacityStart);
      loadingAnim.borderRadius.setValue(borderRadiusStart);

      // Register animations by creating an interaction 'handle' before animation start, and clearing it upon completion in .start(callback): https://reactnative.dev/docs/animated#start
      // const widthHandle = InteractionManager.createInteractionHandle();

      Animated.timing(loadingAnim.width, {
        toValue: widthEnd,
        duration: 250,
        delay: delay,
        useNativeDriver: false,
      }).start();
      // .start(() => {
      //   //InteractionManager.clearInteractionHandle(widthHandle)
      // })// https://reactnative.dev/docs/animated#working-with-animations

      Animated.timing(loadingAnim.borderRadius, {
        toValue: borderRadiusEnd,
        duration: 200,
        delay: delay,
        useNativeDriver: false,
      }).start();

      Animated.timing(loadingAnim.opacity, {
        toValue: opacityEnd,
        duration: 150,
        delay: delay,
        useNativeDriver: true,
      }).start();
    }
  }

  const s = {
    animatedButtonContainer: {
      borderRadius: loadingAnim.borderRadius,
      width: loadingAnim.width,
      height: height,
      // transform: [
      //   {
      //     scaleX: loadingAnim.width,
      //   },
      // ],
    },
    animatedButtonContentView: {
      opacity: loadingAnim.opacity,
      justifyContent: 'center',
      flexDirection: 'row',
    },
  };

  const contentProps = {
    rightIcon,
    leftIcon,
    title,
    children,
    outlineColor: color,
    textColor,
    isOutline,
    mode,
    fontSize,
    level,
    numberOfLines,
  };

  const loadingProps = { isOutline, textColor, outlineColor: color };

  return (
    <Container style={style}>
      <ButtonContainer
        round={round}
        color={color}
        mode={mode}
        isOutline={isOutline}
        style={s.animatedButtonContainer}
        disabled={isDisabledDelay || disabled}
        {...rest}>
        {isLoading ? (
          <LoadingIndicator
            size={'small'}
            loadingColor={loadingColor}
            {...loadingProps}
          />
        ) : (
          <ButtonContent
            style={s.animatedButtonContentView}
            {...contentProps}
          />
        )}
      </ButtonContainer>
    </Container>
  );
};

export default AnimatedButton;
