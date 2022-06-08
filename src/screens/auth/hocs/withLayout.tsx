import React from 'react';

import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';

import colors from 'constants/colors';

export default (WrappedComponent) => (props) => (
  <KeyboardAvoidingView
    style={styles.container}
    keyboardVerticalOffset={64}
    behavior="padding">
    <View style={styles.contentContainer}>
      <WrappedComponent {...props} />
    </View>
  </KeyboardAvoidingView>
);

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DARK_ACCENT,
    // paddingTop: 25,
    // paddingBottom: 25,
    justifyContent: 'space-between',
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    // marginBottom: 80,
    paddingHorizontal: 15,
  },
});
