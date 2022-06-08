import React, { useState } from 'react';

// import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/core';
import footprintFoodLogo from 'assets/add_activity/footprint_activity/food.svg';
import footprintHomeLogo from 'assets/add_activity/footprint_activity/home.svg';
import footprintPurchaseLogo from 'assets/add_activity/footprint_activity/purchase.svg';
import footprintTravelLogo from 'assets/add_activity/footprint_activity/travel.svg';
import challengesLogo from 'assets/add_activity/types/challenges.svg';
import footPrintTypeLogo from 'assets/add_activity/types/footrprint.svg';
import habitTypeLogo from 'assets/add_activity/types/habit.svg';
import activityTypeLogo from 'assets/add_activity/types/activity.svg';
import groupsLogo from 'assets/add_activity/types/groups.svg';
// import offsetCreditsLogo from 'assets/add_activity/types/offset_credits.svg';
import projectsLogo from 'assets/add_activity/types/projects.svg';
import { View } from 'react-native';

import Button from 'components/Button';
import LocalSvg from 'components/LocalSvg';
import Typography from 'components/Typography';
import { SCREEN_HEIGHT } from 'constants/layout';
import {
  ADD_ACTIVITY_NAVIGATOR,
  FOOTPRINT_NAVIGATOR,
  MAIN_NAVIGATOR,
  ROOT_NAVIGATOR,
} from 'constants/routes';
import {
  AddActivityStackNavigationProp,
  AddActivityStackRouteProp,
} from 'types/navigation';
import useMainNav from 'hooks/navigation/useMainNav';
import translator from 'utils/translator';

import ActivityItemsList from './shared/ActivityItemsList';
import {
  Container,
  ContentContainer,
  HeaderContainer,
  PullTargetBar,
  DescriptionContainer,
  ButtonsContainer,
  ActivityAitemsWrapper,
  GoBackOverlay,
} from './styles';

type Props = {
  route: AddActivityStackRouteProp<'SelectActivityModal'>;
  navigation: AddActivityStackNavigationProp<'SelectActivityModal'>;
};

const TYPES_KEY = 'types';
const FOOTPRONT_ACTIVITY = 'Choose_carbon_footprints_to_track';
const MODAL_RATIO = 1.75;

const defaultProps = {};
function ActivityAdd({ ...rest }: Props) {
  const navigation = useNavigation();
  const goTo = useMainNav();
  const [optionsKey, setOptionsKey] = useState(FOOTPRONT_ACTIVITY);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const goBack = () => navigation.goBack();

  const navToProjectsOverview = () => {
    goBack();
    setTimeout(() => {
      // navigation.navigate(routes.MODALS.PROJECTS_OVERVIEW);

      navigation.navigate(MAIN_NAVIGATOR.NAME, {
        screen: ADD_ACTIVITY_NAVIGATOR.NAME,
        params: {
          screen: ADD_ACTIVITY_NAVIGATOR.SCREENS.PROJECTS_OVERVIEW_MODAL.NAME,
        },
      });
    }, 0);
  };

  const navToManualInputForm = () => {
    goBack();
    setTimeout(() => {
      navigation.navigate(MAIN_NAVIGATOR.NAME, {
        screen: ADD_ACTIVITY_NAVIGATOR.NAME,
        params: {
          screen: FOOTPRINT_NAVIGATOR.NAVIGATOR_NAME.NAME,
          params: {
            screen: FOOTPRINT_NAVIGATOR.SCREENS.MANUAL_FORM_SCREEN.NAME,
          },
        },
      });
    }, 0);
  };

  const navToAddActivityScreen = (formType) => {
    goBack();
    setTimeout(() => {
      goTo.addActivity(formType);
    }, 10);
  };

  const goToNotificationScreen = ({ title, subtitle }) =>
    navigation.navigate(ROOT_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
      params: {
        type: 'warning',
        title,
        subtitle,
      },
    });

  const goToChallengesNotificationScreen = () =>
    goToNotificationScreen({
      title: translator.translate('modals.comingSoon.challenges.title'),
      subtitle: translator.translate('modals.comingSoon.challenges.subtitle'),
    });

  const goToGroupNotificationScreen = () =>
    goToNotificationScreen({
      title: translator.translate('modals.comingSoon.groups.title'),
      subtitle: translator.translate('modals.comingSoon.groups.subtitle'),
    });

  const goToInviteNotificationScreen = () =>
    goToNotificationScreen({
      title: translator.translate('modals.comingSoon.inviteFriends.title'),
      // subtitle: '- Share the link on any social platform',
    });

  const goToFootprintSelect = () => {
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate(MAIN_NAVIGATOR.NAME, {
        screen: ADD_ACTIVITY_NAVIGATOR.NAME,
        params: {
          screen:
            ADD_ACTIVITY_NAVIGATOR.SCREENS.SELECT_FOOTPRINT_ACTIVITY_MODAL.NAME,
        },
      });
    }, 0);
  };

  const OPTIONS = {
    [TYPES_KEY]: [
      {
        key: 0,
        title: 'Habit',
        renderIcon: () => (
          <LocalSvg asset={habitTypeLogo} width={26} height={26} />
        ),
        onPress: () => setOptionsKey(FOOTPRONT_ACTIVITY),
      },
      {
        key: 1,
        title: 'Activity',
        renderIcon: () => (
          <LocalSvg asset={activityTypeLogo} width={26} height={26} />
        ),
        onPress: goToFootprintSelect, // () => setOptionsKey(FOOTPRONT_ACTIVITY),
        isDisabled: true,
      },
      // {
      //   key: 2,
      //   title: translator.translate(
      //     'selectAddActivityScreen.options.activityFootprint'
      //   ),
      //   renderIcon: () => (
      //     <LocalSvg asset={footPrintTypeLogo} width={26} height={26} />
      //   ),
      //   onPress: goToFootprintSelect, // () => setOptionsKey(FOOTPRONT_ACTIVITY),
      // },
      // {
      //   key: 3,
      //   title: 'Offset credits',
      //   renderIcon: () => (
      //     <LocalSvg asset={offsetCreditsLogo} width={20} height={20} />
      //   ),
      //   onPress: identity,
      //   isDisabled: true,
      // },
      // {
      //   key: 4,
      //   title: translator.translate('selectAddActivityScreen.options.projects'),
      //   renderIcon: () => (
      //     <LocalSvg asset={projectsLogo} width={18} height={18} />
      //   ),
      //   onPress: navToProjectsOverview,
      // },
      // {
      //   key: 5,
      //   title: translator.translate('selectAddActivityScreen.options.groups'),
      //   renderIcon: () => (
      //     <LocalSvg asset={groupsLogo} width={20} height={20} />
      //   ),
      //   onPress: goToGroupNotificationScreen,
      // },
      // {
      //   key: 6,
      //   title: translator.translate(
      //     'selectAddActivityScreen.options.challenges'
      //   ),
      //   renderIcon: () => (
      //     <LocalSvg asset={challengesLogo} width={21} height={21} />
      //   ),
      //   onPress: goToChallengesNotificationScreen,
      // },
    ],
    [FOOTPRONT_ACTIVITY]: [
      {
        key: 10,
        title: 'Home',
        renderIcon: () => (
          <LocalSvg asset={footprintHomeLogo} width={20} height={20} />
        ),
        onPress: () => navToAddActivityScreen('HOME'),
      },
      {
        key: 11,
        title: 'Food',
        renderIcon: () => (
          <LocalSvg asset={footprintFoodLogo} width={20} height={20} />
        ),
        onPress: () => navToAddActivityScreen('FOOD'),
        //isDisabled: true,
      },
      {
        key: 12,
        title: 'Travel',
        renderIcon: () => (
          <LocalSvg asset={footprintTravelLogo} width={20} height={20} />
        ),
        onPress: () => navToAddActivityScreen('TRAVEL'),
        //isDisabled: true,
      },
      {
        key: 13,
        title: 'Purchase',
        renderIcon: () => (
          <LocalSvg asset={footprintPurchaseLogo} width={20} height={20} />
        ),
        onPress: () => navToAddActivityScreen('PURCHASE'),
        //isDisabled: true,
      },
    ],
  };

  const goToQrScanner = () => {
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate(MAIN_NAVIGATOR.NAME, {
        screen: ADD_ACTIVITY_NAVIGATOR.NAME,
        params: {
          screen: FOOTPRINT_NAVIGATOR.NAVIGATOR_NAME.NAME,
          params: {
            screen: FOOTPRINT_NAVIGATOR.SCREENS.QR_SCANNER_SCREEN.NAME,
          },
        },
      });
    }, 0);
  };

  const goToSyncApps = () => {
    navigation.goBack();
    setTimeout(() => {
      navigation.navigate(ADD_ACTIVITY_NAVIGATOR.NAME, {
        screen: FOOTPRINT_NAVIGATOR.NAVIGATOR_NAME.NAME,
        params: {
          screen: FOOTPRINT_NAVIGATOR.SCREENS.SYNC_APPS_SCREEN,
        },
      });
    }, 0);
  };

  const renderButtonsGroup = () => {
    if (optionsKey == FOOTPRONT_ACTIVITY) {
      return null;
      //   return (<View style={{ flexDirection: 'row' }}>
      //     <View style={{ flex: 1, marginRight: 5 }}>
      //       <Button level={4} mode="dark" onPressHandler={goToQrScanner}>
      //         Scan QR Code
      //       </Button>
      //     </View>

      //     <View style={{ flex: 1, marginLeft: 5 }}>
      //       <Button level={4} onPressHandler={goToSyncApps}>
      //         Sync App
      //       </Button>
      //     </View>
      //   </View>
      // );
    }
    return (
      // <Button onPressHandler={goToInviteNotificationScreen}>
      //   {translator.translate('selectAddActivityScreen.buttons.inviteFriends')}
      // </Button>
      <Button onPressHandler={goBack}>{'Cancel'}</Button>
    );
  };

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
              {'What would you like to add?'}
            </Typography.Title>
          </DescriptionContainer>
          <ActivityAitemsWrapper
            ratio={MODAL_RATIO}
            onContentSizeChange={(width, contentHeight) => {
              contentHeight <= SCREEN_HEIGHT / MODAL_RATIO
                ? setScrollEnabled(false)
                : setScrollEnabled(true);
            }}
            scrollEnabled={scrollEnabled}>
            <ActivityItemsList options={OPTIONS[optionsKey]} />
          </ActivityAitemsWrapper>
        </View>

        <ButtonsContainer>{renderButtonsGroup()}</ButtonsContainer>
      </ContentContainer>
    </Container>
  );
}

ActivityAdd.defaultProps = defaultProps;
export default ActivityAdd;
