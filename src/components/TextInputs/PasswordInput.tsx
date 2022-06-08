import React, { useState } from 'react';

import { TouchableOpacity, View } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import styled from 'styled-components/native';

import { Text } from 'components/Typography';
import { scaleHeight } from 'constants/layout';

function checkLength(value) {
  return value?.length > 7;
}

function checkCase(value) {
  return /(?=.*[A-Z])(?=.*[a-z])/.test(value);
}

function checkNumSym(value) {
  // eslint-disable-next-line no-useless-escape
  const hasSym =
    /[\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\>\=\?\@\[\]\{\}\\\\\^\_\`\~]+/.test(
      value,
    );
  const hasNum = /[\d]/.test(value);
  return hasSym && hasNum;
}

const hints = [
  { value: '8 or more characters long', validator: checkLength },
  { value: 'Upper and lowercase letters', validator: checkCase },
  { value: 'A number and a symbol', validator: checkNumSym },
];

const PasswordInput = ({
  secureTextEntry,
  showSecureText,
  showHints = true,
  showModalHint = false,
  validators,
  onFocus = () => {},
  onBlur = () => {},
  ...inputProps
}) => {
  const [isSecure, setIsSecure] = useState(true);
  const [showFailedHints, setShowFailedHints] = useState(false);
  const [showHintModal, setShowHintModal] = useState(!showModalHint);

  // eslint-disable-next-line no-shadow
  const drawHints = (value, hints, showFailure = false) => {
    return hints.map((hint) => {
      const highlight = hint.validator(value)
        ? { color: 'accent', bold: true }
        : showFailure
        ? { color: 'error', bold: false }
        : {};
      return (
        <Text fontSize={'h9'} key={hint.value} {...highlight}>
          {hint.value}
        </Text>
      );
    });
  };

  const Eye = () => (
    <TouchableOpacity
      onPressIn={() => setIsSecure(false)}
      onPressOut={() => setIsSecure(true)}>
      <Icon name={'eye-outline'} type={'ionicon'} />
    </TouchableOpacity>
  );
  const Show = () => (
    <ButtonContainer onPress={() => setIsSecure((preIsSecure) => !preIsSecure)}>
      <Text bold fontSize={'h9'}>
        {isSecure ? 'SHOW' : 'HIDE'}
      </Text>
    </ButtonContainer>
  );

  const _onFocus = () => {
    showModalHint && setShowHintModal(true);
    onFocus?.();
  };
  const _onBlur = () => {
    showModalHint && setShowHintModal(false);
    setShowFailedHints(true);
    onBlur?.();
  };

  return (
    <>
      {/* Hacky solve for autoCorrect issue */}
      {/* <TextInput style={s.fakeInput} /> */}
      <Input
        placeholder="Password"
        autoComplete="password"
        textContentType="password"
        secureTextEntry={secureTextEntry ?? isSecure}
        rightIcon={secureTextEntry ?? (showSecureText ? Show : Eye)}
        renderErrorMessage={false}
        onFocus={_onFocus}
        onBlur={_onBlur}
        {...inputProps}
      />
      {showHints && showHintModal && (
        <ModalRelativeView>
          <MakeModal isModal={showModalHint}>
            <HintContainer hints={hints}>
              <Text size={'tiny'}>{'Password must contain:'}</Text>
              {hints && drawHints(inputProps?.value, hints, showFailedHints)}
            </HintContainer>
          </MakeModal>
        </ModalRelativeView>
      )}
    </>
  );
};

PasswordInput.propTypes = {};

export default PasswordInput;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.white};
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  min-width: 65px;
  padding-horizontal: 15px;
  padding-vertical: 10px;
`;
//This View is needed for MakeModal to grab onto as well as preventing RegionDropdown overlap
const ModalRelativeView = styled.View`
  position: relative;
  z-index: 10;
`;
const MakeModal = styled.View`
  position: ${({ isModal }) => (isModal ? 'absolute' : 'relative')};
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  z-index: 100;
  background-color: ${({ isModal, theme, mode = 'light' }) =>
    isModal ? theme[mode].background.primary : 'transparent'};
`;

const HintContainer = styled.View`
  margin-top: 6px;
  margin-bottom: 5px;
  /* height: ${({ hints }) =>
    hints ? scaleHeight(13) * hints.length + 'px' : 0 + 'px'}; */
`;

const s = StyleSheet.create({
  fakeInput: {
    // min dims of 1x1 for hack to work
    alignSelf: 'flex-end',
    height: 1,
    width: 1,
    padding: 0,
    margin: 0,
  },
});
