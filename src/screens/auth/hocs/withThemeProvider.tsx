import React from 'react';

import { darken } from 'polished';
import { ThemeProvider } from 'react-native-elements';

import colors from 'constants/colors';
import ui_constants from 'constants/ui';

const { INPUT } = ui_constants;

const CONNECT_THEME = {
  Input: {
    labelStyle: {
      color: colors.LIGHT_GRAY,
      fontSize: INPUT.LABEL,
      textTransform: 'uppercase',
    },
    style: {
      color: '#fff',
      fontSize: INPUT.TEXT,
    },
    containerStyle: {
      paddingHorizontal: 0,
    },
    inputContainerStyle: {
      borderColor: colors.LIGHT_GRAY,
    },
    placeholderTextColor: darken(0.75, colors.LIGHT_GRAY),
  },
};

export default (WrappedComponent) => (props) => (
  <ThemeProvider theme={CONNECT_THEME}>
    <WrappedComponent {...props} />
  </ThemeProvider>
);
