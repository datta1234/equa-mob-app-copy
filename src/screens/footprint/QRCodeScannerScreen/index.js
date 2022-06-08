import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/core';
import { Dimensions } from 'react-native';
import { InteractionManager } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import Button from 'components/Button';
import { FOOTPRINT_NAVIGATOR } from 'constants/routes';
import translator from 'utils/translator';

import { withQuery } from './hocs';
import { Container, BlurContainer } from './styles';

const propTypes = {};

const defaultProps = {};

const height = Dimensions.get('window').height;

function QRCodeScannerScreen({ targetActivity }) {
  const navigation = useNavigation();

  const navToManualInputForm = () => {
    navigation.navigate(FOOTPRINT_NAVIGATOR.SCREENS.MANUAL_FORM_SCREEN.NAME, {
      productName: 'Cucina & Amore Farro Emmer & Spelt Pouch',
      activityId: targetActivity.id,
      QRResponse: {
        targetActivity,
      },
    });
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      navigation.setOptions({
        headerTitle: translator.translate('qRCodeScannerScreen.title'),
      });
    });
  }, []);

  return (
    <BlurContainer>
      <QRCodeScanner
        reactivate
        reactivateTimeout={1500}
        cameraStyle={[{ height }]}
        onRead={navToManualInputForm}
      />

      <Container>
        <Button isOutline onPressHandler={navToManualInputForm}>
          {translator.translate('qRCodeScannerScreen.buttons.scanCode')}
        </Button>
      </Container>
    </BlurContainer>
  );
}

QRCodeScannerScreen.defaultProps = defaultProps;
QRCodeScannerScreen.propTypes = propTypes;
export default withQuery(QRCodeScannerScreen);
