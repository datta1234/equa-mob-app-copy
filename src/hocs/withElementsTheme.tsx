import React from 'react';

import { rgba, darken } from 'polished';
// import { InteractionManager } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import UI from 'constants/ui';

const { INPUT, colors } = UI;
export const RNE_THEME = {
  Input: {
    labelStyle: {
      color: colors.text.label,
      fontSize: INPUT.LABEL,
      fontFamily: 'JosefinSans-Regular',
    },
    errorStyle: {
      color: colors.text.error,
      fontFamily: 'JosefinSans-Regular',
    },
    style: {},
    containerStyle: {
      paddingHorizontal: 0,
    },
    inputContainerStyle: {
      borderColor: colors.GREEN,
      borderWidth: 0,
      borderBottomWidth: 1,
    },
    inputStyle: {
      fontFamily: 'JosefinSans-Regular',
      fontSize: INPUT.TEXT,
      color: colors.text.primary,
    },
    placeholderTextColor: rgba(colors.text.label, 0.4),
  },
  Icon: {
    color: colors.GRAY2,
  },
};

export default (WrappedComponent) => (props) => {
  return (
    <ThemeProvider theme={RNE_THEME}>
      <WrappedComponent {...props} />
    </ThemeProvider>
  );
};
