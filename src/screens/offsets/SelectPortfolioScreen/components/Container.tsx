import React from 'react';

import { View } from 'react-native';

import { RootContainer as ScreenContainer } from 'components/Containers';

import Footer from './Footer';

const Container = ({ children, isFooterVisible, onNext, ...baseProps }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScreenContainer back center {...baseProps}>
        {children}
      </ScreenContainer>
      <Footer isVisible={isFooterVisible} onNext={onNext} />
    </View>
  );
};

export default Container;
