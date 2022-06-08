import React from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import uberImg from 'assets/syncApps/travel/publicTransportation/uber.png';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Button, Placeholder, Typography } from 'components';
import {
  MAIN_NAVIGATOR,
  FOOTPRINT_NAVIGATOR,
  ADD_ACTIVITY_NAVIGATOR,
} from 'constants/routes';
import translator from 'utils/translator';

const propTypes = {};

const defaultProps = {};

function AutomateTrackingPlaceholder({ activityId, isUber }) {
  const navigation = useNavigation();

  const gotToSyncAppsScreen = () =>
    navigation.navigate(MAIN_NAVIGATOR.NAME, {
      screen: ADD_ACTIVITY_NAVIGATOR.NAME,
      params: {
        screen: FOOTPRINT_NAVIGATOR.NAVIGATOR_NAME.NAME,
        params: {
          screen: FOOTPRINT_NAVIGATOR.SCREENS.SYNC_APPS_SCREEN.NAME,
          params: {
            activityId,
          },
        },
      },
    });

  if (isUber) {
    return (
      <View
        style={{
          backgroundColor: '#F4F4F4',
          padding: 30,
          alignItems: 'center',
        }}>
        <View style={{ marginBottom: 15 }}>
          <Image
            source={uberImg}
            style={{ height: 50, width: 50, borderRadius: 8 }}
          />
        </View>
        <Typography.Text>
          {translator.translate(
            'addFootPrintActivityScreen.automateTrackingPlaceholder.appSubtitle',
          )}
        </Typography.Text>
      </View>
    );
  }

  return (
    <Placeholder
      title={translator.translate(
        'addFootPrintActivityScreen.automateTrackingPlaceholder.title',
      )}
      subtitle={translator.translate(
        'addFootPrintActivityScreen.automateTrackingPlaceholder.subtitle',
      )}>
      <Button
        onPressHandler={gotToSyncAppsScreen}
        mode="dark"
        level={5}
        style={{ borderWidth: 0 }}>
        Sync App
      </Button>
    </Placeholder>
  );
}

AutomateTrackingPlaceholder.defaultProps = defaultProps;
AutomateTrackingPlaceholder.propTypes = propTypes;
export default AutomateTrackingPlaceholder;
