import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from 'components/Button';
import translator from 'utils/translator';

import { Container, ButtonWrapper } from './styles';

const propTypes = {};

const defaultProps = {};

function ButtonsGroup({ isDisabled, addFootprintActivity }) {
  const navigation = useNavigation();

  const { bottom } = useSafeAreaInsets();

  return (
    <Container style={{ paddingBottom: bottom }}>
      <ButtonWrapper>
        <Button
          level={4}
          isOutline
          onPressHandler={() => navigation.dangerouslyGetParent()?.goBack()}>
          {translator.translate('addFootPrintActivityScreen.buttons.cancel')}
        </Button>
      </ButtonWrapper>

      <ButtonWrapper>
        <Button
          numberOfLines={1}
          level={4}
          mode="dark"
          onPressHandler={addFootprintActivity}
          isDisabled={isDisabled}>
          {translator.translate(
            'addFootPrintActivityScreen.buttons.saveActivity'
          )}
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

ButtonsGroup.defaultProps = defaultProps;
ButtonsGroup.propTypes = propTypes;
export default ButtonsGroup;
