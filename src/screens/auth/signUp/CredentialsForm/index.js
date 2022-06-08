import React, { Fragment, useEffect, useRef, useState } from 'react';

import { partial, pipe } from 'ramda';
// import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { Icon, Input, Tooltip } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Button from 'components/Button';
import Typography from 'components/Typography';
import colors from 'constants/colors';
import routes from 'constants/routes';
import translator from 'utils/translator';

import { withLayout, withThemeProvider } from '../../hocs';

import { FIELDS } from './constants';
import withMutation from './hocs/withMutation';
import withState from './hocs/withState';
import {
  Container,
  ContentContainer,
  ActionsContainer,
  IntroContainer,
  TitleContainer,
} from './styles';

const propTypes = {};

const defaultProps = {};

function CodeSuspenseForm({
  navigation,
  getFormParam,
  setFormParam,
  onSubmitHandler,
  goToNotificationScreen,
  ...rest
}) {
  const initialInput = useRef(null);

  useEffect(() => {
    if (initialInput.current) {
      initialInput.current.focus();
    }
  }, [initialInput]);

  return (
    <Fragment>
      <Container>
        <ContentContainer>
          <IntroContainer>
            <TitleContainer>
              <Typography.Title mode="dark">
                {translator.translate('signUp.credentialsForm.title')}
              </Typography.Title>
            </TitleContainer>

            <Typography.Text mode="dark" style={{ lineHeight: 0 }}>
              {translator.translate('signUp.credentialsForm.subtitle')}
            </Typography.Text>
          </IntroContainer>
        </ContentContainer>

        <ContentContainer>
          <Input
            placeholder={translator.translate(
              'signUp.credentialsForm.fields.mobileNumber.placeholder'
            )}
            label={translator.translate(
              'signUp.credentialsForm.fields.mobileNumber.label'
            )}
            keyboardType="phone-pad"
            ref={initialInput}
            value={getFormParam(FIELDS.MOBILE_NUMBER.NAME)}
            onChangeText={setFormParam(FIELDS.MOBILE_NUMBER.NAME)}
          />
          <Input
            placeholder={translator.translate(
              'signUp.credentialsForm.fields.carbonCreditCode.placeholder'
            )}
            label={translator.translate(
              'signUp.credentialsForm.fields.carbonCreditCode.label'
            )}
            autoCapitalize="none"
            value={getFormParam(FIELDS.CARBON_CREDIT_CODE.NAME)}
            onChangeText={setFormParam(FIELDS.CARBON_CREDIT_CODE.NAME)}
            rightIcon={
              <Tooltip
                overlayColor="rgba(30, 30, 30, 0.75)"
                backgroundColor="#fff"
                popover={<Text>Info here</Text>}>
                <Icon
                  type="antdesign"
                  name="questioncircleo"
                  size={18}
                  color={colors.GRAY2}
                />
              </Tooltip>
            }
          />
        </ContentContainer>
      </Container>

      <ActionsContainer>
        <Button onPressHandler={onSubmitHandler} mode="dark">
          {translator.translate('signUp.credentialsForm.buttons.submit')}
        </Button>

        <TouchableOpacity
          onPress={() =>
            goToNotificationScreen({
              title: translator.translate('modals.comingSoon.title'),
              subtitle: translator.translate('modals.comingSoon.subtitle'),
              type: 'warning',
            })
          }>
          <ContentContainer>
            <Typography.Title mode="dark" level={5} uppercase center>
              {translator.translate('signUp.credentialsForm.buttons.help')}
            </Typography.Title>
          </ContentContainer>
        </TouchableOpacity>
      </ActionsContainer>
    </Fragment>
  );
}

CodeSuspenseForm.defaultProps = defaultProps;
CodeSuspenseForm.propTypes = propTypes;
export default pipe(
  withLayout,
  withThemeProvider,
  // ----- //
  withState,
  withMutation
)(CodeSuspenseForm);
