import React from 'react';

import { Input, InputProps } from 'react-native-elements';

interface EmailInputProps extends InputProps {}

const EmailInput = ({ validators, ...inputProps }: EmailInputProps) => {
  return (
    <Input
      placeholder="Email"
      autoCapitalize="none"
      autoComplete="email" //Android
      textContentType="emailAddress" //iOS - use "username" for autofill
      keyboardType="email-address"
      maxLength={250}
      autoCorrect={false}
      {...inputProps}
    />
  );
};

export default EmailInput;
