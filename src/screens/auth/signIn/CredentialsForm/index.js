import React, { useEffect, useRef } from 'react';

import { pipe } from 'ramda';
import { InteractionManager } from 'react-native';
import { Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Button from 'components/Button';
import Typography from 'components/Typography';
// import PropTypes from 'prop-types';
import translator from 'utils/translator';

import { withLayout, withThemeProvider } from '../../hocs';

import { FIELDS } from './constants';
import { withMutation, withState } from './hocs';
import {
  Container,
  ContenbtContainer,
  ActionsContainer,
  IntroContainer,
  TitleContainer,
} from './styles';

const propTypes = {};

const defaultProps = {};

function SignInScreen({
  onSubmitHandler,
  getFormParam,
  setFormParam,
  goToNotificationScreen,
}) {
  const initialInput = useRef(null);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (initialInput.current) {
        initialInput.current.focus();
      }
    });
  }, []);

  return (
    <>
      <Container>
        <ContenbtContainer>
          <IntroContainer>
            <TitleContainer>
              <Typography.Title mode="dark">
                {translator.translate('signIn.credentialsForm.title')}
              </Typography.Title>
            </TitleContainer>

            <Typography.Text mode="dark" style={{ lineHeight: 16 }}>
              {translator.translate('signIn.credentialsForm.subtitle')}
            </Typography.Text>
          </IntroContainer>
        </ContenbtContainer>
        <Input
          placeholder={translator.translate(
            'signIn.credentialsForm.fields.email.placeholder',
          )}
          label={translator.translate(
            'signIn.credentialsForm.fields.email.label',
          )}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          ref={initialInput}
          value={getFormParam(FIELDS.EMAIL.NAME)}
          onChangeText={setFormParam(FIELDS.EMAIL.NAME)}
        />
        <Input
          placeholder={translator.translate(
            'signIn.credentialsForm.fields.password.placeholder',
          )}
          label={translator.translate(
            'signIn.credentialsForm.fields.password.label',
          )}
          secureTextEntry
          value={getFormParam(FIELDS.PASSWORD.NAME)}
          onChangeText={setFormParam(FIELDS.PASSWORD.NAME)}
        />
      </Container>

      <ActionsContainer>
        <Button onPressHandler={onSubmitHandler} mode="dark">
          {translator.translate('signIn.credentialsForm.buttons.submit')}
        </Button>

        <TouchableOpacity
          onPress={() =>
            goToNotificationScreen({
              title: translator.translate('modals.comingSoon.title'),
              subtitle: translator.translate('modals.comingSoon.subtitle'),
              type: 'warning',
            })
          }>
          <ContenbtContainer style={[{ alignItems: 'center' }]}>
            <Typography.Title mode="dark" level={5} uppercase>
              {translator.translate(
                'signIn.credentialsForm.buttons.forgotPassword',
              )}
            </Typography.Title>
          </ContenbtContainer>
        </TouchableOpacity>
      </ActionsContainer>
    </>
  );
}

SignInScreen.defaultProps = defaultProps;
SignInScreen.propTypes = propTypes;
export default pipe(
  withLayout,
  withThemeProvider,
  withState,
  withMutation,
)(SignInScreen);
