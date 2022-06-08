import React from 'react';

import { length } from 'ramda';
import { Linking } from 'react-native';

import { RootContainer as ScreenContainer } from 'components/Containers';
import LegalLinks from 'components/Legal';
import colors from 'constants/colors';
import { SETTINGS_NAVIGATOR } from 'constants/routes';
import useNotification from 'hooks/useNotification';
import {
  SettingsStackNavigationProp,
  SettingsStackRouteProp,
} from 'types/navigation';

import useLogoutModal from './hooks/useLogoutModal';
import {
  Body,
  Menu,
  MenuItemContainer,
  Item,
  MenuIcon,
  ForwardIcon,
  Title,
  Separator,
} from './menu.styles';

type Props = {
  route: SettingsStackRouteProp<'MenuScreen'>;
  navigation: SettingsStackNavigationProp<'MenuScreen'>;
};

const MenuItem = ({ item, isLast }) => (
  <MenuItemContainer>
    <Item onPress={item?.onPress}>
      <MenuIcon color={'primary'} iconColor={colors.WHITE} type={item.icon} />
      <Title level={4} color={'primary'}>
        {item.title}
      </Title>
      <ForwardIcon />
    </Item>
    {isLast ? null : <Separator />}
  </MenuItemContainer>
);

const profileScreen = SETTINGS_NAVIGATOR.PROFILE_SCREEN.NAME;
const carbonCodeScreen = SETTINGS_NAVIGATOR.CARBON_CODE_SCREEN.NAME;
const settingsScreen = SETTINGS_NAVIGATOR.SETTINGS_SCREEN.NAME;

const defaultProps = {};
function SettingsScreen({ navigation }: Props) {
  const goToProfileDetails = () => navigation.navigate(profileScreen);
  const goToCarbonCode = () => navigation.navigate(carbonCodeScreen);
  const goToSettings = () => navigation.navigate(settingsScreen);
  const showModal = useNotification();
  //   const goToPasswordReset = () => navigation.navigate(resetPasswordScreen);

  const onLogout = useLogoutModal();

  const openMail = () =>
    Linking.openURL(
      'mailto:support@aq-green.com?subject=AQ Green App feedback&body=Dear AG Green Team,\n\n',
    );

  function showContactInfo() {
    showModal({
      type: 'info',
      title: 'Contact us',
      subtitle:
        'You can email us at \nsupport@aq-green.com \nor press ‘Proceed’ to open up your email directly.',
      actionText: 'Proceed',
      onActionPress: openMail,
      cancel: true,
    });
  }

  const menuList = [
    {
      key: 1,
      icon: 'profile',
      title: 'Profile details',
      onPress: goToProfileDetails,
    },
    { key: 2, icon: 'settings', title: 'Settings', onPress: goToSettings },
    {
      key: 3,
      icon: 'code',
      title: 'Enter carbon code',
      onPress: goToCarbonCode,
    },
    { key: 4, icon: 'logout', title: 'Logout', onPress: onLogout },
    { key: 5, icon: 'contact', title: 'Contact us', onPress: showContactInfo },
  ];

  return (
    <ScreenContainer close title={'MENU'}>
      <Body>
        <Menu>
          {menuList.map((item, idx) => (
            <MenuItem
              key={item.key}
              item={item}
              isLast={idx + 1 === length(menuList)}
            />
          ))}
        </Menu>
        <LegalLinks />
      </Body>
    </ScreenContainer>
  );
}
SettingsScreen.defaultProps = defaultProps;
export default SettingsScreen;
