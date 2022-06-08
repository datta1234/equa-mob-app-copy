import React, { useEffect } from 'react';
import { Platform, UIManager } from 'react-native';

import * as Sentry from '@sentry/react-native';
import codePush from 'react-native-code-push';
import Config from 'react-native-config';
import { enableScreens } from 'react-native-screens';

import { consoleMethods } from 'constants/index';

import Application from './index';
import translator from './utils/translator';
if (__DEV__) {
  // eslint-disable-next-line no-console
  import('../ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

if (!__DEV__) {
  Sentry.init({
    dsn: Config.SENTRY_DSN,
    environment: Config.ENV,
    debug: false,
  });
}
// setJSExceptionHandler((error, isFatal) => {
//   Sentry.captureException(error);
// }, true);

enableScreens();

if (!__DEV__) {
  consoleMethods.forEach((methodName) => {
    // eslint-disable-next-line no-console
    console[methodName] = () => {
      /* noop */
    };
  });
}

// To allow for native animations using LayoutAnimation API on android UIManager flags need to be set
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    // UIManager.setLayoutAnimationEnabledExperimental(true); // set to true for Android. Switched off as current RN has a bug for layoutAnimation
  }
}

const App = () => {
  //LogBox.ignoreLogs(['']);

  useEffect(() => {
    translator.setI18nConfig(); // set initial config
  }, []);

  return <Application />;
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  //installMode: UPDATE_MODE === 'SILENT' ? codePush.InstallMode.ON_NEXT_RESTART : codePush.InstallMode.IMMEDIATE
  // deploymentKey: ''  //To dynamically override you deployment key(use a different deployment)
};

export default codePush(codePushOptions)(App);
