import React from 'react';
import { StyleSheet } from 'react-native';

import { Input, InputProps } from 'react-native-elements';

import colors from 'constants/colors';

interface CarbonCodeInputProps extends InputProps {}

const CarbonCodeInput = ({ ...inputProps }: CarbonCodeInputProps) => {
  return (
    <Input
      inputStyle={s.inputStyle}
      inputContainerStyle={s.inputContainerStyle}
      containerStyle={s.containerStyle}
      placeholder="Enter carbon code"
      autoCapitalize="characters"
      autoComplete={'off'} //Android
      textContentType="none" //iOS
      maxLength={250}
      autoCorrect={false}
      {...inputProps}
    />
  );
};

export default CarbonCodeInput;

const s = StyleSheet.create({
  inputStyle: {
    paddingHorizontal: 20,
  },
  inputContainerStyle: {
    marginTop: 10,
    backgroundColor: colors.GRAY4,
    borderColor: colors.GRAY3,
    borderWidth: 1,
    borderRadius: 10,
  },
  containerStyle: {
    marginTop: 10,
  },
});
