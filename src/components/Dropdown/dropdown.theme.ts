import R from 'ramda';
import { StyleSheet } from 'react-native';
import rootTheme from 'react-native-dropdown-picker/src/themes';

import UI from 'constants/ui';
import { font, elementSize } from 'constants/ui';
import { RNE_THEME } from 'hocs/withElementsTheme';

const { colors } = UI;

//Overrides for rootTheme defaults
const lightStyles = StyleSheet.create({
  titleStyle: { ...RNE_THEME.Input.labelStyle, marginTop: 10 },
  style: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    paddingLeft: 0,
    borderRadius: null,
    ...RNE_THEME.Input.inputContainerStyle,
  },
  // textStyle styles all text (base styles)
  textStyle: {
    ...font,
  },
  // labelStyle styles the selected item text
  label: {
    ...font,
    ...RNE_THEME.Input.inputStyle,
  },
  // listItemLabelStyle styles the labels items in the list
  listItemLabel: {
    ...font,
    color: colors.text.info,
    fontSize: elementSize.DROPDOWN.LIST,
  },
  // placeholder styles the placeholder before an item is selected
  placeholderStyle: {
    color: RNE_THEME.Input.placeholderTextColor,
    paddingLeft: 0,
  },
  itemSeparator: {
    backgroundColor: colors.GRAY4,
    height: 1,
    marginHorizontal: 10,
  },
  dropDownContainer: {
    borderWidth: 0,
    //     borderTopWidth: 1,
    //     borderColor: colors.GREEN,
  },
  selectedItemLabel: {
    fontWeight: '700',
    color: colors.text.primary,
  },
});
const darkStyles = StyleSheet.create({});

const light = {
  ICONS: rootTheme.LIGHT.ICONS,
  default: R.mergeDeepRight(rootTheme.LIGHT.default, { ...lightStyles }),
};
const dark = {
  ICONS: rootTheme.DARK.ICONS,
  default: R.mergeDeepRight(rootTheme.DARK.default, darkStyles),
};

export default {
  LIGHT: light,
  DARK: dark,
};
