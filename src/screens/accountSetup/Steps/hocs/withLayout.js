import React, { useCallback, useRef } from 'react';

import { useFocusEffect, useScrollToTop } from '@react-navigation/native';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import {
  KeyboardAwareScrollView,
  listenToKeyboardEvents,
} from 'react-native-keyboard-aware-scroll-view';

import colors from 'constants/colors';

export default (WrappedComponent) => (props) => {
  const ref = useRef(null);

  useScrollToTop(ref);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (ref.current) {
  //       ref.current.scrollToPosition(0, 0);
  //     }
  //   }, [])
  // );

  // console.log('listenToKeyboardEvents', listenToKeyboardEvents);
  return (
    <KeyboardAwareScrollView
      ref={ref}
      behavior="padding"
      contentContainerStyle={styles.container}
      // extraHeight={25}
      keyboardOpeningTime={0}
      enableResetScrollToCoords={false}>
      <WrappedComponent {...props} />
    </KeyboardAwareScrollView>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.LIGHT_GRAY,
    justifyContent: 'space-between',
    // paddingVertical: 15,
    // paddingTop: 25,
  },
});
