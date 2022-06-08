import React, { useEffect, useRef, useState } from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import uberImg from 'assets/uber_auth_logo.png';
import { rgba } from 'polished';
import { KeyboardAvoidingView, Image, View } from 'react-native';
import { TextInput } from 'react-native';
import { InteractionManager } from 'react-native';

import { Typography, Button } from 'components';
import { FOOTPRINT_NAVIGATOR } from 'constants/routes';

import { withQuery } from './hocs';
import { Container } from './styles';

const propTypes = {};

const defaultProps = {};

function UberAuth({ targetActivity }) {
  const navigation = useNavigation();
  const navToManualInputForm = () => {
    navigation.replace(FOOTPRINT_NAVIGATOR.SCREENS.MANUAL_FORM_SCREEN.NAME, {
      productName: 'Uber service',
      activityId: targetActivity.id,
      isUber: true,
      QRResponse: {
        targetActivity,
      },
    });
  };

  const inputRef = useRef(null);

  const [inputState, setInputState] = useState('+1');

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    });
  }, [inputRef.current]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={64}
      behavior="padding">
      <Container
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          // paddingTop: 50,
          backgroundColor: '#fff',
        }}>
        <Image source={uberImg} style={{ width: 90, height: 90 }} />

        <View style={{ width: '100%', paddingHorizontal: 25 }}>
          <View
            style={{
              marginVertical: 40,
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginVertical: 10,
              }}>
              <View style={{ marginBottom: 5 }}>
                <Typography.Title>Get moving with Uber</Typography.Title>
              </View>
              <Typography.Title level={5}>
                Enter your number (required)
              </Typography.Title>
            </View>

            <TextInput
              ref={inputRef}
              value={inputState}
              onChangeText={setInputState}
              style={{
                borderBottomWidth: 1,
                borderColor: rgba('#000', 0.25),
                paddingVertical: 15,
                paddingHorizontal: 5,
                fontSize: 18,
              }}
            />
          </View>

          <Button onPressHandler={() => navToManualInputForm()}>Next</Button>
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}

UberAuth.defaultProps = defaultProps;
UberAuth.propTypes = propTypes;
export default withQuery(UberAuth);
