import React from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { TouchableOpacity } from 'react-native';

import { ROOT_NAVIGATOR } from 'constants/routes';

import { Container, Title, MoreText } from './activitiesTitleBar.styles';

function ActivitiesTitleBar() {
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
    <Container>
      <Title>{'Activities Breakdown'}</Title>

      {/* <TouchableOpacity onPress={goToNotificationScreen}>
        <MoreText>
          {'See more'}
        </MoreText>
      </TouchableOpacity> */}
    </Container>
  );
}

const propTypes = {};
const defaultProps = {};

ActivitiesTitleBar.defaultProps = defaultProps;
ActivitiesTitleBar.propTypes = propTypes;
export default ActivitiesTitleBar;
