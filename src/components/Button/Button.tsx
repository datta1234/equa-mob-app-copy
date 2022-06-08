import React from 'react';

import PropTypes from 'prop-types';

import { nodeType } from 'utils/helpers';

import { AnimatedButton, BaseButton } from './components';
import withFadeAnimation from './components/hoc/withFadeAnimation';

const propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']),
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7]),
  leftIcon: nodeType,
  rightIcon: nodeType,
};

const defaultProps = {
  mode: 'light',
  color: 'primary',
  level: 5,
};

function Button(props) {
  const {
    mode,
    title,
    onPressHandler,
    level,
    textColor,
    fontSize,
    isDisabled,
    isLoading,
    showLoadingAnimation = true,
    loadingColor,
    isOutline,
    round,
    numberOfLines,
    color,
    borderColor,
    leftIcon,
    rightIcon,
    buttonWidth,
    buttonHeight,
  } = props;

  const disabled = !onPressHandler || isLoading || isDisabled;

  const canAnimate = typeof isLoading === 'boolean';

  const [buttonLayout, setButtonLayout] = React.useState({
    height: undefined,
    width: undefined,
  });

  const getAnimatedButtonSizes = (event) => {
    const layout = event.nativeEvent.layout;
    if (buttonLayout.width) {
      return;
    } else {
      // loadingAnim.width.setValue(layout.width);
      // loadingAnim.borderRadius.setValue(layout.height);
      setButtonLayout(layout);
    }
  };

  const useAnimatedButton =
    buttonLayout.width && showLoadingAnimation && canAnimate;

  if (useAnimatedButton) {
    return (
      <AnimatedButton
        buttonWidth={buttonLayout.width}
        buttonHeight={buttonLayout.height}
        disabled={disabled}
        {...props}
      />
    );
  }
  // note the base button gets the animated buttons initial layout. This is rendered first to determine layouts and then the animated button replaces it if useAnimatedButton=true
  return (
    <BaseButton
      onLayout={getAnimatedButtonSizes}
      disabled={disabled}
      {...props}
    />
  );
}

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default withFadeAnimation(Button);
