import React from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View } from 'react-native';

import { images } from 'assets';
import { Button, Icon } from 'components';
import { ADD_ACTIVITY_NAVIGATOR, MAIN_NAVIGATOR } from 'constants/routes';

import { Container, Background, Title, ButtonContainer } from './styles';

const propTypes = {};

const defaultProps = {};

function InitialScreen() {
  const navigation = useNavigation();

  const goToSelectionActivity = () =>
    navigation.navigate(MAIN_NAVIGATOR.NAME, {
      screen: ADD_ACTIVITY_NAVIGATOR.NAME,
      params: {
        screen: ADD_ACTIVITY_NAVIGATOR.SELECT_ACTIVITY_MODAL_SCREEN.NAME,
      },
    });

  return (
    <Container>
      <Background
        source={images.TREES_SOLID_BG}
        resizeMode={'contain'}
        // overflow={'visible'}
      >
        <Icon type={'bell'} color={'dark'} />
        <Title>{'You currently do not have \nany activities'}</Title>
        <ButtonContainer>
          <Button
            round
            color={'dark'}
            fontSize={'h8'}
            onPressHandler={goToSelectionActivity}>
            Add activity
          </Button>
        </ButtonContainer>
      </Background>
    </Container>
  );
}

InitialScreen.defaultProps = defaultProps;
InitialScreen.propTypes = propTypes;
export default InitialScreen;
