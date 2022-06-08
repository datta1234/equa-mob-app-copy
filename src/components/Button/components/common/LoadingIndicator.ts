import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const LoadingIndicator = styled(ActivityIndicator).attrs(
  ({
    theme,
    mode = 'light',
    loadingColor,
    textColor,
    isOutline,
    outlineColor = 'secondary',
  }) => ({
    color: loadingColor
      ? theme[mode].indicator[loadingColor]
      : textColor
      ? theme[mode].text[textColor]
      : isOutline
      ? theme[mode].buttons[outlineColor]
      : theme[mode].text.light,
    // animating: isLoading,
  })
)``;

export default LoadingIndicator;
