import { useNavigation } from '@react-navigation/native';

import {
  ADD_ACTIVITY_NAVIGATOR,
  OFFSETS_NAVIGATOR,
  MAIN_NAVIGATOR,
  SETTINGS_NAVIGATOR,
  BOTTOM_TABS_NAVIGATOR,
} from 'constants/routes';

const TAB_NAV = BOTTOM_TABS_NAVIGATOR.NAME;
const DASHBOARD_SCREEN = BOTTOM_TABS_NAVIGATOR.DASHBOARD_SCREEN.NAME;
const ADD_ACTIVITY_NAV = ADD_ACTIVITY_NAVIGATOR.NAME;
const ADD_ACTIVITY_SCREEN =
  ADD_ACTIVITY_NAVIGATOR.ADD_ACTIVITY_SCREEN.NAME;
const SELECT_ACTIVITY_MODAL =
  ADD_ACTIVITY_NAVIGATOR.SELECT_ACTIVITY_MODAL_SCREEN.NAME;
const SETTINGS_NAV = SETTINGS_NAVIGATOR.NAME;
const OFFSETS_NAV = OFFSETS_NAVIGATOR.NAME;
const PROFILE_SCREEN = SETTINGS_NAVIGATOR.PROFILE_SCREEN.NAME;
const SETTINGS_SCREEN = SETTINGS_NAVIGATOR.SETTINGS_SCREEN.NAME;
const MENU_SCREEN = SETTINGS_NAVIGATOR.MENU_SCREEN.NAME;
const AUTO_OFFSET_SCREEN = OFFSETS_NAVIGATOR.AUTO_OFFSET_SCREEN.NAME;

function useMainNav() {
  const navigation = useNavigation();

  const dashboard = () =>
    navigation.navigate(TAB_NAV, {
      screen: DASHBOARD_SCREEN,
    });

  const selectionActivity = () =>
    navigation.navigate(ADD_ACTIVITY_NAV, {
      screen: SELECT_ACTIVITY_MODAL,
    });

  const addActivity = (activityTypeCode) =>
    navigation.navigate(ADD_ACTIVITY_NAV, {
      screen: ADD_ACTIVITY_SCREEN,
      params: {
        groupCode: activityTypeCode,
      },
    });

  const profile = () =>
    navigation.navigate(SETTINGS_NAV, {
      screen: PROFILE_SCREEN,
    });
  const offsets = ({ selectedPortfolioId, ...params }) =>
    navigation.navigate(OFFSETS_NAV, {
      screen: AUTO_OFFSET_SCREEN,
      params: { selectedPortfolioId, ...params },
    });
  const menu = () =>
    navigation.navigate(SETTINGS_NAV, {
      screen: MENU_SCREEN,
    });
  const settings = () =>
    navigation.navigate(SETTINGS_NAV, {
      screen: SETTINGS_SCREEN,
    });

  const goTo = {
    dashboard,
    selectionActivity,
    addActivity,
    offsets,
    menu,
    profile,
    settings,
  };

  return goTo;
}

export default useMainNav;
