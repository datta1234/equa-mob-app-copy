import React, { useState } from 'react';

import DropDownPicker from 'react-native-dropdown-picker';

import { Text } from 'components/Typography';

import AQTheme from './dropdown.theme';

DropDownPicker.setListMode('SCROLLVIEW'); //sets the default for the component
DropDownPicker.addTheme('AQLight', AQTheme.LIGHT);
DropDownPicker.setTheme('AQLight');

const s = AQTheme.LIGHT.default;

const Dropdown = ({ title, titleStyle, editable, ...rest }) => {
  const [open, setOpen] = useState(false);

  return (
    // Do not remove View component wrapping Dropdown, it prevents component from overlapping the Password hint text
    //<View style={{ position: 'relative', zIndex: 1 }}>
    <>
      <Text bold style={[s.titleStyle, titleStyle]}>
        {title}
      </Text>
      <DropDownPicker
        open={open}
        setOpen={setOpen}
        itemSeparator={true}
        showTickIcon={false}
        stickyHeader={true}
        showArrowIcon={editable}
        disabled={editable}
        placeholderStyle={s.placeholderStyle}
        {...rest}
      />
    </>
  );
};

export default Dropdown;
