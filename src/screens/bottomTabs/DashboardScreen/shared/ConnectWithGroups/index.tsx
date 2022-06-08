import React from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { times } from 'ramda';
// import {navigation} from "react-native"

import Button from 'components/Button';
import Typography from 'components/Typography';
import { ROOT_NAVIGATOR } from 'constants/routes';
import translator from 'utils/translator';

import PreviewList from './PreviewList';
import {
  Container,
  PreviewListWrapper,
  ContentWrapper,
  ButtonContainer,
} from './styles';

const propTypes = {};

const defaultProps = {};

function ConnectWithGroups() {
  // console.log('times(PreviewList.Item, 25)', );
  const navigation = useNavigation();

  const goToGroupNotificationScreen = () =>
    navigation.navigate(ROOT_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
      params: {
        type: 'warning',
        title: translator.translate('modals.comingSoon.groups.title'),
        subtitle: translator.translate('modals.comingSoon.groups.subtitle'),
      },
    });

  return (
    <Container>
      <ContentWrapper style={{ marginBottom: 0, marginTop: 0 }}>
        <Typography.Title mode="dark" level={2}>
          {translator.translate('profileScreen.connectWithGroupsBlock.title')}
        </Typography.Title>
      </ContentWrapper>

      <ContentWrapper>
        <Typography.Text mode="dark">
          {translator.translate(
            'profileScreen.connectWithGroupsBlock.subtitle',
          )}
        </Typography.Text>
      </ContentWrapper>

      <PreviewListWrapper>
        <PreviewList>
          {times(
            (key) => (
              <PreviewList.Item key={key} />
            ),
            25,
          )}
        </PreviewList>
      </PreviewListWrapper>

      <ContentWrapper>
        <ButtonContainer>
          <Button level={5} onPressHandler={goToGroupNotificationScreen}>
            {translator.translate(
              'profileScreen.connectWithGroupsBlock.buttons.connect',
            )}
          </Button>
        </ButtonContainer>
      </ContentWrapper>
    </Container>
  );
}

ConnectWithGroups.defaultProps = defaultProps;
ConnectWithGroups.propTypes = propTypes;
export default ConnectWithGroups;
