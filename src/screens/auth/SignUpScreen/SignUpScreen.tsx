import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { omit, pipe } from 'ramda';
import { Input } from 'react-native-elements';

import { BaseContainer as ScreenContainer } from 'components/Containers';
import {
  EmailInput,
  PasswordInput,
  CarbonCodeInput,
} from 'components/TextInputs';
import { Text } from 'components/Typography';
import { AUTH_NAVIGATOR } from 'constants/routes';
import { AuthStackNavigationProp, AuthStackRouteProp } from 'types/navigation';
import { testEmptyInputs } from 'utils/helpers';

import AuthHeader from '../shared/AuthHeader';

import { withState, withMutation } from './hocs';
import { RegionDropdown } from './components';
import { FIELDS } from './constants';
import {
  DetailsHeader,
  ContentWrapper,
  ActionButton,
  CancelButton,
  SignInButton,
} from './signUp.styles';

type Props = {
  route: AuthStackRouteProp<'SignUpScreen'>;
  navigation: AuthStackNavigationProp<'SignUpScreen'>;
  loading?: boolean;
  onCreateAccount?: (event: GestureResponderEvent) => void;
};

const defaultProps = {};
function SignUpScreen({
  onCreateAccount,
  loading,
  getFormParam,
  setFormParam,
  values,
  setValue,
  errors,
  clearError,
  setError,
  navigation,
}) {
  const areInputsEmpty = testEmptyInputs(
    omit([FIELDS.VOUCHER_CODE.NAME], values),
  );
  const canGoNext = !areInputsEmpty;

  const setRegionValue = (input) => {
    let nextValue;
    if (typeof input === 'function') {
      nextValue = input(values.regionId);
    } else {
      nextValue = input;
    }
    setValue.regionId(nextValue);
  };

  const goToSignIn = () =>
    navigation.replace(AUTH_NAVIGATOR.SIGN_IN_SCREEN.NAME);

  return (
    <ScreenContainer header={<AuthHeader title={'WELCOME'} />}>
      <ContentWrapper>
        <DetailsHeader>
          <Text size={'small'} center>
            {'Account Details'}
          </Text>
        </DetailsHeader>
        <Input
          placeholder="First name"
          label="FIRST NAME"
          maxLength={26}
          value={values.firstName}
          onChangeText={setValue.firstName}
        />
        <Input
          placeholder="Last name"
          label="LAST NAME"
          maxLength={26}
          value={values.lastName}
          onChangeText={setValue.lastName}
        />
        <EmailInput
          label="EMAIL"
          value={values.email}
          onChangeText={setValue.email}
        />

        <PasswordInput
          label={'PASSWORD'}
          showSecureText
          value={values.password}
          textContentType="newPassword" //Suggest saving password in keychain for new passwords
          onChangeText={setValue.password}
        />
        <RegionDropdown value={values.regionId} setValue={setRegionValue} />
        <CarbonCodeInput
          // label="CARBON CODE"
          value={values.voucherCode}
          onChangeText={setValue.voucherCode}
        />
        <ActionButton
          isLoading={loading}
          isDisabled={!canGoNext}
          onPressHandler={onCreateAccount}>
          Create Account
        </ActionButton>
        {navigation.canGoBack() ? (
          <CancelButton onPress={navigation.goBack} />
        ) : (
          <SignInButton onPress={goToSignIn} />
        )}
      </ContentWrapper>
    </ScreenContainer>
  );
}

SignUpScreen.defaultProps = defaultProps;
export default pipe(withState, withMutation)(SignUpScreen);
