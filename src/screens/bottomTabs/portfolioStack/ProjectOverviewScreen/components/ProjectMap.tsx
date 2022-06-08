import React from 'react';

import { Image, Linking, TouchableOpacity, StyleSheet } from 'react-native';

import { scale } from 'constants/layout';

function handleLink(thisLink) {
  if (Linking.canOpenURL(thisLink)) {
    Linking.openURL(thisLink);
  }
}

const ProjectMap = ({ map }) => {
  return (
    <TouchableOpacity
      disabled={!map?.referenceUrl}
      onPress={() => handleLink(map?.referenceUrl)}>
      <Image source={{ uri: map?.url }} style={s.map} />
    </TouchableOpacity>
  );
};

export default ProjectMap;

const s = StyleSheet.create({
  map: {
    height: scale(197),
    width: '100%',
    borderRadius: 10,
  },
});
