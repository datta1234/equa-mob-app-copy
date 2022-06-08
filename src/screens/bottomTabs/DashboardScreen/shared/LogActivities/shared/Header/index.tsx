import React from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity, Text, View } from 'react-native';

import { Typography } from 'components';
import { ROOT_NAVIGATOR } from 'constants/routes';
import translator from 'utils/translator';

import { HeaderContainer } from './styles';

const propTypes = {};

const defaultProps = {};

function LogActivitiesHeader() {
  const navigation = useNavigation();

  const goToNotificationScreen = () =>
    navigation.navigate(ROOT_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
      params: {
        type: 'warning',
        title: 'New Feature Coming Soon',
        subtitle: '- Detailed list of activities',
      },
    });

  return (
    <HeaderContainer>
      <Typography.Title level={2}>{'Latest activities'}</Typography.Title>

      {/* <TouchableOpacity onPress={goToNotificationScreen}>
        <Typography.Text size="small" uppercase>
          {'See more'}
        </Typography.Text>
      </TouchableOpacity> */}
    </HeaderContainer>
  );
}

LogActivitiesHeader.defaultProps = defaultProps;
LogActivitiesHeader.propTypes = propTypes;
export default LogActivitiesHeader;
