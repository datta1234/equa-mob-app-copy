import React from 'react';

import { View, StyleSheet } from 'react-native';

import SelectedIcon from '../../SelectedIcon';

const SelectedOverlay = ({ isSelected, width, children }) => {
  if (!isSelected) {
    return children;
  }

  const size = (width + 10) / 2 || 52;

  const Icon = () => (
    <View style={s.iconCont}>
      <SelectedIcon.Single size={size} />
    </View>
  );
  return (
    <View>
      <Icon />
      <View style={s.overlay}>{children}</View>
    </View>
  );
};

export default SelectedOverlay;

const s = StyleSheet.create({
  iconCont: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: { opacity: 0.5 },
});
