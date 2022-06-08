import React from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from 'components';
import {
  MAIN_NAVIGATOR,
  ADD_ACTIVITY_NAVIGATOR,
  FOOTPRINT_NAVIGATOR,
} from 'constants/routes';
import translator from 'utils/translator';

const propTypes = {};

const defaultProps = {};

function ButtonsGroup() {
  const navigation = useNavigation();

  const goToQrScanner = () => {
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate(MAIN_NAVIGATOR.NAME, {
        screen: ADD_ACTIVITY_NAVIGATOR.NAME,
        params: {
          screen: FOOTPRINT_NAVIGATOR.NAVIGATOR_NAME.NAME,
          params: {
            screen: FOOTPRINT_NAVIGATOR.SCREENS.QR_SCANNER_SCREEN.NAME,
          },
        },
      });
    }, 0);
  };

  const goToSyncApps = () => {
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate(ADD_ACTIVITY_NAVIGATOR.NAME, {
        screen: FOOTPRINT_NAVIGATOR.NAVIGATOR_NAME.NAME,
        params: {
          screen: FOOTPRINT_NAVIGATOR.SCREENS.SYNC_APPS_SCREEN.NAME,
        },
      });
    }, 0);
  };

  return (
    <SafeAreaView edges={['bottom']}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 5 }}>
          <Button level={4} mode="dark" onPressHandler={goToQrScanner}>
            {translator.translate('selectAddActivityScreen.buttons.scanQrCode')}
          </Button>
        </View>

        <View style={{ flex: 1, marginLeft: 5 }}>
          <Button level={4} onPressHandler={goToSyncApps}>
            {translator.translate('selectAddActivityScreen.buttons.syncApp')}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

ButtonsGroup.defaultProps = defaultProps;
ButtonsGroup.propTypes = propTypes;
export default ButtonsGroup;
