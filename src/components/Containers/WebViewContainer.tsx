// @flow
import React, { useRef, useState } from 'react';

import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
// import type { WebViewNativeEvent } from 'react-native-webview';

// import ModalNavView from 'components/ModalNavView/ModalNavView';
import LoadingOverlay from 'components/LoadingOverlay/LoadingOverlay';
import colors from 'constants/colors';

// type Props = {|
//   source: string,
//   onNavigationStateChange: (newNavState: WebViewNativeEvent, setFetching: Function) => void,
//   onError?: (error?: string) => void;
//   loadingStyle?: Object,
// |};

function WebViewContainer(
  {
    source,
    url,
    loadingStyle,
    onError,
    onLoad,
    onLoadStart,
    onLoadEnd,
    onNavigationStateChange,
    ...webViewProps
  } //: Props
) {
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  function _onLoad(syntheticEvent) {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.url === 'about:blank') {
      //CLOSE WEBVIEW
      //     ref.current.goBack()
    }
    onLoad();
  }
  function _onLoadEnd(syntheticEvent) {
    // update component to be aware of loading status
    onLoadEnd
      ? onLoadEnd(syntheticEvent, setLoading)
      : setLoading(syntheticEvent.nativeEvent.loading);
  }
  function _onLoadStart(syntheticEvent) {
    // update component to be aware of loading status
    onLoadStart ? onLoadStart(syntheticEvent, setLoading) : setLoading(true);
  }

  return (
    <SafeAreaView style={s.container}>
      {/* <ModalNavView
        onPress={navigation.pop}
      /> */}
      <WebView
        ref={ref}
        source={{ ...source, uri: url }}
        onLoad={_onLoad}
        onLoadEnd={_onLoadEnd}
        onLoadStart={_onLoadStart}
        onNavigationStateChange={(
          newNavState
          // : WebViewNativeEvent
        ) => onNavigationStateChange(newNavState, setLoading, ref)}
        onError={onError}
        {...webViewProps}
      />
      <LoadingOverlay style={loadingStyle} visible={loading} />
    </SafeAreaView>
  );
}

WebViewContainer.defaultProps = {
  onLoad: () => {},
};

export default React.memo(WebViewContainer);

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});
