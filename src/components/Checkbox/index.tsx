import React, { FC } from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { checkbox } from 'constants/colors';

const Checkbox = ({ onPress, checked, disabled }: CheckboxItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={getCheckboxStyle(disabled, checked)}>
      {checked && (
        <Image style={s.tick} source={require('assets/icons/check.png')} />
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;

const getCheckboxStyle = (disabled: boolean, checked: boolean) => {
  if (checked && disabled) {
    return [s.checkbox, s.checkedDisabled];
  }
  if (checked && !disabled) {
    return [s.checkbox, s.checked];
  }
  if (!checked && disabled) {
    return [s.checkbox, s.disabled];
  }

  return s.checkbox;
};

interface CheckboxItemProps {
  checked: boolean;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  onPress: () => void 0,
};

const s = StyleSheet.create({
  checkbox: {
    height: 30,
    width: 30,
    backgroundColor: checkbox.background,
    borderWidth: 2,
    borderColor: checkbox.border,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tick: {
    // width: 13,
    // height: 9,
  },
  checked: {
    backgroundColor: checkbox.backgroundSelected,
    borderColor: checkbox.borderSelected,
  },
  disabled: {
    backgroundColor: checkbox.backgroundDisabled,
    borderColor: checkbox.borderDisabled,
  },
  checkedDisabled: {
    backgroundColor: checkbox.backgroundSelectedDisabled,
    borderColor: checkbox.borderSelectedDisabled,
  },
});
