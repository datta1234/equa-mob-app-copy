import React, { useEffect, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/core';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from 'components';
import { getInOr, isDefined } from 'utils/ramda';
import translator from 'utils/translator';

import { Input } from './shared';
import {
  Container,
  GoBackOverlay,
  ContentContainer,
  HeaderContainer,
  PullTargetBar,
} from './styles';

const propTypes = {};

const defaultProps = {};

function ManualInputScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = () => navigation.goBack();

  const [inputValue, setInputValue] = useState(
    getInOr(0, 'params.value', route)
  );

  useEffect(() => {
    if (isDefined(inputValue)) {
      route?.params?.onChange?.(parseFloat(inputValue));
    }
  }, [inputValue, route.params]);

  return (
    <Container>
      <GoBackOverlay onPress={goBack} />

      <ContentContainer>
        <SafeAreaView
          style={{ flex: 1, justifyContent: 'space-between' }}
          edges={['bottom']}>
          <View>
            <HeaderContainer>
              <PullTargetBar />
            </HeaderContainer>

            <Input value={inputValue} onChange={setInputValue} />
          </View>

          <Button
            onPressHandler={() => {
              route?.params?.onChange?.(parseFloat(inputValue));
              goBack();
            }}>
            {translator.translate('manualInputScreen.buttons.submit')}
          </Button>
        </SafeAreaView>
      </ContentContainer>
    </Container>
  );
}

ManualInputScreen.defaultProps = defaultProps;
ManualInputScreen.propTypes = propTypes;
export default ManualInputScreen;
