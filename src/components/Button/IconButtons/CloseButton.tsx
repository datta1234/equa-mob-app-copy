import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Icon from 'components/Icon/Icon';

const CloseButton = ({ type = 'close', ...props }) => {
  const navigation = useNavigation();

  return navigation.canGoBack() ? (
    <Icon type={type} onPress={() => navigation.goBack()} {...props} />
  ) : null;
};

export default CloseButton;
