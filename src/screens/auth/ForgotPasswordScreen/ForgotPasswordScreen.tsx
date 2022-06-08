import React, { useState } from 'react';

import useNotification from 'hooks/useNotification';
import { runAfterInteractionHOF } from 'utils/helpers';
import { isDefined } from 'utils/ramda';
import { AuthStackNavigationProp, AuthStackRouteProp } from 'types/navigation';

import useForgotPassword from '../hooks/useForgotPassword';
import AuthActionContainer from '../shared/AuthActionContainer';

import { Email, ActionButton, CancelButton } from './forgotPassword.styles';

const title =
  'You will be sent an email with instructions to reset your password.';

type Props = {
  route: AuthStackRouteProp<'ForgotPasswordScreen'>;
  navigation: AuthStackNavigationProp<'ForgotPasswordScreen'>;
};

const defaultProps = {};

function ForgotPasswordScreen({ navigation, route }: Props) {
  const routeEmail = route?.params?.email || '';
  const showNotification = useNotification({ isAuth: true });

  const [email, setEmail] = useState(routeEmail);
  const [emailError, setEmailError] = useState('');

  const [forgotPasswordReq, { loading }] = useForgotPassword({
    onCompleted: runAfterInteractionHOF((data) => {
      navigation.goBack();
      showNotification({
        type: 'mail',
        title: data?.ForgotPassword?.message,
      });
    }),
  });

  const handleRequestPasswordReset = () => {
    if (isDefined(email)) {
      forgotPasswordReq({ variables: { email: email } });
    } else {
      setEmailError('Please enter your email address to reset');
    }
  };
  return (
    <AuthActionContainer title={title}>
      <Email
        //label="EMAIL"
        value={email}
        onChangeText={(val) => setEmail((val || '').toLowerCase().trim())}
        errorMessage={emailError}
      />
      <ActionButton
        title={'Send Instructions'}
        isLoading={loading}
        onPressHandler={handleRequestPasswordReset}
      />
      <CancelButton onPress={navigation.goBack} />
    </AuthActionContainer>
  );
}

ForgotPasswordScreen.defaultProps = defaultProps;
export default ForgotPasswordScreen;
