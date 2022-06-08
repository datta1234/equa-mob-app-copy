import { GestureResponderEvent } from 'react-native';
import { compose } from 'ramda';

import { withForgotPasswordQuery, withQuery, withState } from './hocs';

import React from 'react';

import { images } from 'assets';

import { BaseContainer as ScreenContainer } from 'components/Containers';
import LegalLinks from 'components/Legal';
import { EmailInput, PasswordInput } from 'components/TextInputs';
import colors from 'constants/colors';
import { AUTH_NAVIGATOR } from 'constants/routes';
import { AuthStackNavigationProp, AuthStackRouteProp } from 'types/navigation';
import { testEmptyInputs } from 'utils/helpers';

import { AuthHeader, PoweredBy } from '../shared';

import {
  ForgotPassword,
  ContentWrapper,
  ActionButton,
  QuestionText,
  CreateAccountButton,
} from './signIn.styles';

const trees = images.LOGIN_BG;

type Props = {
  route: AuthStackRouteProp<'SignInScreen'>;
  navigation: AuthStackNavigationProp<'SignInScreen'>;
  loading?: boolean;
  onSubmitHandler?: (event: GestureResponderEvent) => void;
  onForgotPasswordSubmit?: (event: GestureResponderEvent) => void;
};

const defaultProps = {};
function SignInScreen({
  onSubmitHandler,
  onForgotPasswordSubmit,
  loading,
  getFormParam,
  setFormParam,
  values,
  setValue,
  errors,
  clearError,
  setError,
  navigation,
}: Props) {
  const areInputsEmpty = testEmptyInputs(values);

  const goToForgotPassword = () =>
    navigation.navigate(AUTH_NAVIGATOR.FORGOT_PASSWORD_SCREEN.NAME, {
      email: values.email,
    });

  const goToSignup = () =>
    navigation.navigate(AUTH_NAVIGATOR.SIGN_UP_SCREEN.NAME);

  return (
    <ScreenContainer
      dark
      headerImageSource={trees}
      header={<AuthHeader title={'WELCOME'} />}>
      <ContentWrapper>
        <EmailInput
          style={{ color: colors.WHITE }}
          onBlur={clearError.email}
          errorMessage={errors.email}
          value={values.email}
          onChangeText={setValue.email}
        />
        <PasswordInput
          style={{ color: colors.WHITE }}
          placeholder="Password"
          value={values.password}
          onChangeText={setValue.password}
          showHints={false}
        />
        <ForgotPassword
          onPress={goToForgotPassword}
          onLongPress={onForgotPasswordSubmit}
        />

        <ActionButton
          isLoading={loading}
          isDisabled={areInputsEmpty}
          onPressHandler={onSubmitHandler}>
          SIGN IN
        </ActionButton>

        <QuestionText>Don't Have An Account?</QuestionText>
        <CreateAccountButton onPress={goToSignup} />
      </ContentWrapper>
      <LegalLinks />
      <PoweredBy />
    </ScreenContainer>
  );
}
SignInScreen.defaultProps = defaultProps;

export default compose(
  withQuery,
  withForgotPasswordQuery,
  withState,
)(SignInScreen);
