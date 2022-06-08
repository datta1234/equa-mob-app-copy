import React, { useEffect, useState } from 'react';
// import { ReactNode } from 'react';

import crashlytics from '@react-native-firebase/crashlytics';
import remoteConfig from '@react-native-firebase/remote-config';
import SplashScreen from 'react-native-splash-screen';
import { fetchAndActivate } from 'utils/remoteConfig';

// interface Props {
//   children?: ReactNode;
// }

export default (WrappedComponent) => (props) => {
  const [loaded, setLoaded] = useState(false);

  const initializer = async () => {
    // set up remote config
    await remoteConfig() // 10000 = 10seconds
      .setConfigSettings({ minimumFetchIntervalMillis: 100000 }) //  minimum interval that needs to elapse before a fetch request can again be made to the Remote Config server (global cache frequency). 300000 s = 5 m
      .then(() =>
        remoteConfig().setDefaults({
          under_maintenance: false,
          minimum_version: '0.0.0',
        }),
      )
      .then(() => fetchAndActivate())
      .catch((err) => {
        crashlytics().log('Remote config failed:\n\n', err, '\n\n');
      });

    SplashScreen.hide();
    setLoaded(true);
  };
  useEffect(() => {
    let unmounted = false;
    if (unmounted) return;
    initializer();
    return () => {
      unmounted = true;
    };
  }, []);

  if (!loaded) {
    return null;
  }
  return <WrappedComponent {...props} />;
};
