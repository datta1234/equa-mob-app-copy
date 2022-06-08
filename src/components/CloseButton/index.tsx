import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const CloseButton = ({}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <PressableStyled insets={insets} hitSlop={20} onPress={goBack}>
      <CloseIcon />
    </PressableStyled>
  );
};

export default CloseButton;

export const PressableStyled = styled(Pressable)`
  position: absolute;
  right: 25px;
  top: ${({ insets }) => 5 + insets.top + 'px'};
  z-index: 100;
  padding: 10px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

export const CloseIcon = styled(Icon).attrs(({ theme, mode = 'light' }) => ({
  type: 'antdesign',
  name: 'close',
  size: 17,
  color: theme[mode].colors.dark,
}))``;
