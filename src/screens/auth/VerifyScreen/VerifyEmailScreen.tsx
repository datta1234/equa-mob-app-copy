import React from 'react';
import { GestureResponderEvent, TextInput } from 'react-native';

import { AuthStackNavigationProp, AuthStackRouteProp } from 'types/navigation';

import AuthActionContainer from '../shared/AuthActionContainer';

import { withQuery } from './hocs';
import {
  ActionButton,
  ResendButton,
  Text,
  ContentItemWrapper,
} from './verifyEmail.styles';

const title = "We've sent you an \nemail to verify \nyour account!";
const infoText = 'Please also check your spam folder for this email';

type Props = {
  route: AuthStackRouteProp<'VerificationScreen'>;
  navigation: AuthStackNavigationProp<'VerificationScreen'>;
  loading?: boolean;
  onSubmitHandler?: (event: GestureResponderEvent) => void;
  onResend?: (event: GestureResponderEvent) => void;
};

const defaultProps = {};
function VerifyEmailScreen({ onSubmitHandler, loading, onResend }: Props) {
  return (
    <AuthActionContainer title={title} infoText={infoText}>
      <TextInput />
      <ActionButton isLoading={loading} onPressHandler={onSubmitHandler}>
        I've verified my Account!
      </ActionButton>
      <ContentItemWrapper>
        <Text>Didn't Receive a Verification Email?</Text>
        <ResendButton onPress={onResend} />
      </ContentItemWrapper>
    </AuthActionContainer>
  );
}

VerifyEmailScreen.defaultProps = defaultProps;
export default withQuery(VerifyEmailScreen);
