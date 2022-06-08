import React from 'react';

import { useNavigation } from '@react-navigation/native';
import BackIcon from 'assets/svgs/BackIcon';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import styled from 'styled-components/native';

import { Title, Text } from 'components/Typography';
import { background } from 'constants/colors';
import { scale } from 'constants/layout';
import { isIOS } from 'utils/helpers';

export default function ProjectHeader({ category, name }) {
  const navigation = useNavigation();
  const categoryLabel = category ?? '[Project Category]';

  function handleBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <View>
      <TouchableOpacity style={s.backIcon} onPress={handleBack}>
        <BackIcon />
      </TouchableOpacity>
      <View style={s.layout}>
        <Regular style={s.centeredText}>{categoryLabel.toUpperCase()}</Regular>
        <Heading>{name}</Heading>
      </View>
    </View>
  );
}
const Heading = styled(Title).attrs({
  center: true,
  fontSize: 'h6',
})``;

const Regular = styled(Text).attrs({
  fontSize: 'h8',
})`
  padding-bottom: 4px;
`;

const s = StyleSheet.create({
  layout: {
    width: scale(332),
    borderRadius: scale(16),
    marginTop: scale(24),
    marginBottom: scale(42),
    minHeight: scale(84),
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: background.primary,
  },
  centeredText: {
    textAlign: 'center',
  },
  backIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(35),
    height: scale(35),
    borderRadius: scale(35),
    backgroundColor: 'white',
    marginTop: isIOS ? 5 : 12,
    // marginLeft: scale(24),
  },
});
