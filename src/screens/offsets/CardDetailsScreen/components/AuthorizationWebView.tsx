import React, { useEffect, useState } from 'react';

import WebViewContainer from 'components/Containers/WebViewContainer';

import { FullScreenModalContainer } from './authorizationWebView.styles';
import SubscriptionLoadingStatus from './SubscriptionLoadingStatus';

const SUBSCRIPTION_API_REDIRECT_ENDPOINT = 'aq-green';

const STATUSES = {
  DEBIT_PENDING: 'DEBIT_PENDING',
  ALLOCATE_FAILED: 'ALLOCATE_FAILED',
  ALLOCATE_PENDING: 'ALLOCATE_PENDING',
  REFUND_SUCCESS: 'REFUND_SUCCESS',
  SUCCESS: 'SUCCESS',
};

const AuthorizationWebView = ({ authorizeUrl, status, closeWebView }) => {
  const [webViewUrl, setWebViewUrl] = useState(null);

  // Subscription returns null for authorization URL when status is not DEBIT_PENDING. This will cause the webview to redirect so webURL is explicitly set in effect.
  useEffect(() => {
    if (status === STATUSES.DEBIT_PENDING && authorizeUrl) {
      setWebViewUrl(authorizeUrl); // when webViewUrl exists we show webview otherwise loader
    }
  }, [authorizeUrl, status]);

  function onLoadEnd(syntheticEvent, setLoading) {
    const { nativeEvent } = syntheticEvent;
    setTimeout(() => {
      setLoading(nativeEvent.loading);
    }, 2300); // many redirects from stripe so delay loading end here
  }

  const onNavigationStateChange = (newNavState, setLoading, ref) => {
    const { url, loading: isWebViewLoading } = newNavState;
    if (!url) {
      return;
    }
    if (url.includes(SUBSCRIPTION_API_REDIRECT_ENDPOINT)) {
      // closeWebView();
      setWebViewUrl(null);
    }
    //     if (isWebViewLoading) {
    //       setLoading(true);
    //     } else {
    //       setLoading(false);
    //     }
    //     // one way to handle errors is via query string
    //     if (url.includes('?errors=true')) {
    //       this.webview.stopLoading();
    //     }
  };

  return (
    <FullScreenModalContainer>
      {webViewUrl ? (
        <WebViewContainer
          url={webViewUrl}
          onLoadEnd={onLoadEnd}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : (
        <SubscriptionLoadingStatus status={status} />
      )}
    </FullScreenModalContainer>
  );
};

export default AuthorizationWebView;
