import React, { useRef, useState, useEffect } from 'react';

import analytics from '@react-native-firebase/analytics';
import remoteConfig from '@react-native-firebase/remote-config';
import { compare } from 'compare-versions';
import { compose } from 'ramda';
import { AppState, AppStateStatus, StatusBar } from 'react-native';
import { getVersion } from 'react-native-device-info';
// import PropTypes from 'prop-types';

import { UpdateAppScreen, MaintenanceScreen } from 'screens';
import remoteConfigUtils from 'utils/remoteConfig';
// import withTestSideMenu from './hocs/withTestSideMenu';
import {
  withApolloProvider,
  withElementsTheme,
  withInitializer,
  withModalActivityIndicator,
  withTheme,
} from './hocs';
import Navigation from './navigation';

const propTypes = {};

const defaultProps = {};

const fetchIsUpdateRequired = async () => {
  const installedVersion = getVersion();
  const minimumAllowedVersion = await remoteConfigUtils.getMinimumVersion();
  return compare(minimumAllowedVersion, installedVersion, '>');
};

function Application() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const maintenance = remoteConfig().getBoolean('under_maintenance');
  const minimumVersion = remoteConfig().getString('minimum_version');
  const installedVersion = getVersion();

  const [isUpdateRequired, setIsUpdateRequired] = useState(
    compare(minimumVersion, installedVersion, '>'),
  );

  const handleAppOpen = async (nextAppState: AppStateStatus) => {
    const prevAppState = appState.current; // get previous app state from ref

    // App is opened for the first time
    if (prevAppState === 'unknown' && nextAppState === 'active') {
      // Analytics auto-logs sessions, so no need to log analytics here
    }
    // App is opened from the background
    if (prevAppState.match(/background/) && nextAppState === 'active') {
      await analytics().logAppOpen(); // This event logs App is moved to the foreground
      const isRequired = await fetchIsUpdateRequired();
      setIsUpdateRequired(isRequired);
    }
    // inactive state is for iOS only: when transitioning between foreground & background
    if (prevAppState.match(/inactive/)) {
    }

    setAppStateVisible(nextAppState);
    appState.current = nextAppState; // update ref to save the incoming app state (current app state) to be called as the previous in future
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppOpen);
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      {isUpdateRequired ? <UpdateAppScreen /> : <Navigation />}
    </>
  );
}

Application.defaultProps = defaultProps;
Application.propTypes = propTypes;
export default compose(
  withInitializer,
  withApolloProvider,
  withElementsTheme,
  withTheme,
  withModalActivityIndicator,
  // withTestSideMenu,
)(Application);
