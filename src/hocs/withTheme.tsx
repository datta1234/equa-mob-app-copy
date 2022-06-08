import React from 'react';

import { ColorSchemeName, useColorScheme } from 'react-native';
import { ThemeProvider, DefaultTheme } from 'styled-components';
import styled from 'styled-components/native';

import colors, {
  activity,
  icons,
  toggle,
  indicator,
  text,
  buttons,
  background,
  progressBar,
} from 'constants/colors';
import UI from 'constants/ui';

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: ColorSchemeName;
    light: typeof lightTheme;
    dark: typeof darkTheme;
    fontSize: typeof UI.fontSize;
  }
}

export const lightTheme = {
  text,
  buttons,
  background,
  activity,
  icons,
  toggle,
  progressBar,
  indicator,
  colors: {
    accent: colors.ACCENT,
    white: colors.WHITE,
    black: colors.BLACK,
    lightGray: colors.LIGHT_GRAY,
    lightGray1: colors.LIGHT_GRAY1,
    mediumGray: colors.GRAY3,
    gray: colors.GRAY2,
    darkAccent: colors.DARK_ACCENT,
    dark: colors.NAVY,
    success: colors.SUCCESS,
    fonts: {
      primary: colors.FONTS.PRIMARY,
      accent: colors.FONTS.ACCENT,
      secondary: colors.FONTS.SECONDARY,
      tertiary: colors.FONTS.TERTIARY,
      success: colors.SUCCESS,
    },
  },
};

export const darkTheme = {
  text,
  buttons,
  background,
  activity,
  icons,
  progressBar,
  indicator,
  colors: {
    accent: colors.ACCENT,
    white: colors.NAVY,
    lightGray: colors.LIGHT_GRAY,
    lightGray1: colors.LIGHT_GRAY1,
    mediumGray: colors.GRAY3,
    gray: colors.GRAY2,
    dark: colors.WHITE,
    success: colors.SUCCESS,
    fonts: {
      primary: colors.FONTS.LIGHT_PRIMARY,
      accent: colors.FONTS.LIGHT_ACCENT,
      secondary: colors.FONTS.LIGHT_SECONDARY,
      tertiary: colors.FONTS.PRIMARY,
      success: colors.SUCCESS,
    },
  },
};

const theme: DefaultTheme = {
  mode: 'light',
  light: lightTheme,
  dark: darkTheme,
  fontSize: UI.fontSize,
};

export default (WrappedComponent) => (props) => {
  const currentMode = useColorScheme();
  return (
    <ThemeProvider theme={{ ...theme, mode: currentMode }}>
      <Container>
        <WrappedComponent {...props} />
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.View`
  background-color: ${({ theme }) => theme[theme.mode].colors.dark};
  flex: 1;
`;
