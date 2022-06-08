import React from 'react';

import { equals, last, map, pipe, slice, when } from 'ramda';
import { TouchableOpacity, View } from 'react-native';

import { svgs } from 'assets';
import Typography from 'components/Typography';
import {
  MAIN_NAVIGATOR,
  ADD_ACTIVITY_NAVIGATOR,
  BOTTOM_TABS_NAVIGATOR,
  ROOT_NAVIGATOR,
} from 'constants/routes';
import { getInOr, getIn, isDefined } from 'utils/ramda';
import translator from 'utils/translator';

import CustomTabBarItem from '../CustomTabBarItem';

import {
  TabBarItemsContainer,
  ActivityTabItemContainer,
  PlusIconContainer,
  PlusIcon,
  StyledSafeAreaContainer,
  PlusIconWrapper,
} from './styles';

const propTypes = {};

const defaultProps = {};

function CustomTabBar({ state, descriptors, navigation }) {
  const renderTabItem = ({ name, key }) => {
    const tabBarLabel = getInOr(
      name,
      [key, 'options.tabBarLabel'],
      descriptors,
    );

    const tabBarAccessibilityLabel = getIn(
      [key, 'options.tabBarAccessibilityLabel'],
      descriptors,
    );

    const renderTabBarIcon = getInOr(
      name,
      [key, 'options.tabBarIcon'],
      descriptors,
    );

    const isActive = pipe(
      getInOr([], 'history'),
      last,
      when(isDefined, getIn('key')),
      equals(key),
    )(state);

    const onPress = () => {
      const { NEWS_FEED_SCREEN, PROFILE_SCREEN, DISCOVER_SCREEN } =
        BOTTOM_TABS_NAVIGATOR;

      const event = navigation.emit({
        type: 'tabPress',
        target: key,
      });

      const goToNotificationScreen = ({ title, subtitle }) =>
        navigation.navigate(ROOT_NAVIGATOR.NAME, {
          screen: ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
          params: {
            type: 'warning',
            title,
            subtitle,
          },
        });

      if (equals(name, NEWS_FEED_SCREEN.NAME)) {
        return goToNotificationScreen({
          title: translator.translate('modals.comingSoon.newsPage.title'),
          subtitle: translator.translate('modals.comingSoon.newsPage.subtitle'),
        });
      }

      if (equals(name, PROFILE_SCREEN.NAME)) {
        return goToNotificationScreen({
          title: 'Profile page coming soon', //translator.translate('modals.comingSoon.portfolioPage.title'),
          subtitle: '- Update your profile information \n- Reset your password', //translator.translate('modals.comingSoon.portfolioPage.subtitle'),
        });
      }

      if (equals(name, DISCOVER_SCREEN.NAME)) {
        return goToNotificationScreen({
          title: translator.translate('modals.comingSoon.discoverPage.title'),
          subtitle: translator.translate(
            'modals.comingSoon.discoverPage.subtitle',
          ),
        });
      }

      if (!isActive && !event.defaultPrevented) {
        navigation.navigate(name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: key,
      });
    };

    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        accessibilityRole="button"
        accessibilityStates={isActive ? ['selected'] : []}
        accessibilityLabel={tabBarAccessibilityLabel}
        onPress={onPress}
        key={key}
        onLongPress={onLongPress}>
        <CustomTabBarItem
          tabBarLabel={tabBarLabel}
          renderTabBarIcon={renderTabBarIcon}
          isActive={isActive}
        />
      </TouchableOpacity>
    );
  };

  const renderTabItems = map(renderTabItem);

  const renderAddActivityButton = () => {
    const goToSelectionActivity = () =>
      navigation.navigate(ADD_ACTIVITY_NAVIGATOR.NAME, {
        screen: ADD_ACTIVITY_NAVIGATOR.SELECT_ACTIVITY_MODAL_SCREEN.NAME,
      });

    const AddActivityIcon = svgs.icons.tabBarIcons.addActivity;

    return (
      <ActivityTabItemContainer>
        <TouchableOpacity onPress={goToSelectionActivity} activeOpacity={0.85}>
          <PlusIconWrapper>
            <PlusIconContainer>
              <AddActivityIcon />
            </PlusIconContainer>
          </PlusIconWrapper>
        </TouchableOpacity>
        <Typography.Text color={'light'} size="tiny">
          {'Activities'}
        </Typography.Text>
      </ActivityTabItemContainer>
    );
  };

  return (
    <StyledSafeAreaContainer>
      <TabBarItemsContainer>
        {renderTabItems(slice(0, 1, state.routes))}
        {renderAddActivityButton()}
        {renderTabItems(slice(1, 2, state.routes))}
      </TabBarItemsContainer>
    </StyledSafeAreaContainer>
  );
}

CustomTabBar.defaultProps = defaultProps;
CustomTabBar.propTypes = propTypes;
export default CustomTabBar;
