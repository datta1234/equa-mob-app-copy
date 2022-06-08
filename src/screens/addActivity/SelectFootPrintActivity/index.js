import React from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import { map } from 'ramda';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';

import Typography from 'components/Typography';
import {
  ADD_ACTIVITY_NAVIGATOR,
  MAIN_NAVIGATOR,
  FOOTPRINT_NAVIGATOR,
} from 'constants/routes';
import translator from 'utils/translator';

import {
  Container,
  ContentContainer,
  HeaderContainer,
  PullTargetBar,
  DescriptionContainer,
  ActivityAitemsWrapper,
  GoBackOverlay,
} from '../SelectScreen/styles';
import { ActivityItem } from '../shared';

import { withQuery } from './hocs';
import { ButtonsGroup } from './shared';

const propTypes = {};

const defaultProps = {};

function SelectFootPrintActivity({ activities }) {
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  const navToManualInputForm = (activityId) => {
    goBack();
    setTimeout(() => {
      navigation.navigate(MAIN_NAVIGATOR.NAME, {
        screen: ADD_ACTIVITY_NAVIGATOR.NAME,
        params: {
          screen: FOOTPRINT_NAVIGATOR.NAVIGATOR_NAME.NAME,
          params: {
            screen: FOOTPRINT_NAVIGATOR.SCREENS.MANUAL_FORM_SCREEN.NAME,
            params: {
              activityId,
            },
          },
        },
      });
    }, 0);
  };

  const renderActivityItem = ({ id, title, thumbnailLogo }) => (
    <TouchableOpacity key={id} onPress={() => navToManualInputForm(id)}>
      <ActivityItem
        renderIcon={() => (
          <FastImage
            style={{ width: 25, height: 25 }}
            source={{
              uri: thumbnailLogo,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}>
        {title}
      </ActivityItem>
    </TouchableOpacity>
  );

  const renderActivityItems = map(renderActivityItem);

  return (
    <Container>
      <GoBackOverlay onPress={goBack} />

      <ContentContainer>
        <View>
          <HeaderContainer>
            <PullTargetBar />
          </HeaderContainer>

          <DescriptionContainer>
            <Typography.Title level={2}>
              {translator.translate('selectAddActivityScreen.title')}
            </Typography.Title>
          </DescriptionContainer>

          <ActivityAitemsWrapper>
            {renderActivityItems(activities)}
          </ActivityAitemsWrapper>
        </View>

        <ButtonsGroup />
      </ContentContainer>
    </Container>
  );
}

SelectFootPrintActivity.defaultProps = defaultProps;
SelectFootPrintActivity.propTypes = propTypes;
export default withQuery(SelectFootPrintActivity);
