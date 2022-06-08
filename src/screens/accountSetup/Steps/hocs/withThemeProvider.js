import React from 'react';

import { rgba, darken } from 'polished';
// import { InteractionManager } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import colors from 'constants/colors';
import ui_constants from 'constants/ui';

const { INPUT } = ui_constants;

const CONNECT_THEME = {
  Input: {
    labelStyle: {
      color: colors.GRAY2,
      fontSize: INPUT.LABEL,
    },
    style: {
      // color: rgba(colors.LIGHT_GRAY, 0.75),
      fontSize: INPUT.TEXT,
    },
    containerStyle: {
      paddingHorizontal: 0,
    },
    inputContainerStyle: {
      borderColor: colors.GRAY2,
    },
    placeholderTextColor: rgba(colors.GRAY2, 0.35),
  },
};

export default (WrappedComponent) => (props) => {
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   InteractionManager.runAfterInteractions(() => {
  //     setLoading(false);
  //     console.log('InteractionManager.runAfterInteractions');
  //   });
  // }, []);

  // if (isLoading) {
  //   return <ActivityIndicator />;
  // }

  return (
    <ThemeProvider theme={CONNECT_THEME}>
      <WrappedComponent {...props} />
    </ThemeProvider>
  );
};
