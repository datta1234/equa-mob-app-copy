import React from 'react';

// import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { ActivityIndicator } from 'react-native';
import { RootStackNavigationProp, RootStackRouteProp } from 'types/navigation';
// import PropTypes from 'prop-types';
// import { StyleSheet, View } from 'react-native';

import { Container } from './styles';

type Props = {
  route: RootStackRouteProp<'DisabledLoaderModal'>;
  navigation: RootStackNavigationProp<'DisabledLoaderModal'>;
};

const defaultProps = {};
function DisabledLoaderModal({}: Props) {
  // const navigation = useNavigation();

  // const goBack = () => navigation.goBack();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       // console.log('blur');
  //       // goBack();
  //     };
  //   }, [])
  // );

  return (
    <Container>
      <ActivityIndicator color="#fff" size="large" />
    </Container>
  );
}

DisabledLoaderModal.defaultProps = defaultProps;
export default DisabledLoaderModal;
