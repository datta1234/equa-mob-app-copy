import { useNavigation } from '@react-navigation/native';

import {
  OFFSETS_NAVIGATOR,
  MAIN_NAVIGATOR,
  BOTTOM_TABS_NAVIGATOR,
  ROOT_NAVIGATOR,
} from 'constants/routes';

const MAIN_NAV = MAIN_NAVIGATOR.NAME;
const OFFSETS_NAV = OFFSETS_NAVIGATOR.NAME;
const BOTTOM_TABS_NAV = BOTTOM_TABS_NAVIGATOR.NAME;
const AUTO_OFFSET_SCREEN = OFFSETS_NAVIGATOR.AUTO_OFFSET_SCREEN.NAME;
const PORTFOLIO_SELECTION_SCREEN =
  OFFSETS_NAVIGATOR.SELECT_PORTFOLIO_SCREEN.NAME;
const SUBSCRIPTION_OVERVIEW_SCREEN =
  OFFSETS_NAVIGATOR.SUBSCRIPTION_OVERVIEW_SCREEN.NAME;
const PURCHASE_AGREEMENT_SCREEN =
  OFFSETS_NAVIGATOR.CONFIRM_SUBSCRIPTION_SCREEN.NAME;
const CARD_DETAILS_SCREEN = OFFSETS_NAVIGATOR.CARD_DETAILS_SCREEN.NAME;
const PAYMENT_NOTIFICATION_SCREEN =
  OFFSETS_NAVIGATOR.PAYMENT_NOTIFICATION_SCREEN.NAME;
const CANCEL_SUBSCRIPTION_SCREEN =
  OFFSETS_NAVIGATOR.CANCEL_SUBSCRIPTION_SCREEN.NAME;
const DASHBOARD_SCREEN = BOTTOM_TABS_NAVIGATOR.DASHBOARD_SCREEN.NAME;

function useOffsetNav() {
  const navigation = useNavigation();

  const autoOffset = () =>
    navigation.navigate(MAIN_NAV, {
      screen: OFFSETS_NAV,
      params: {
        screen: AUTO_OFFSET_SCREEN,
      },
    });

  const portfolioSelection = () =>
    navigation.navigate(MAIN_NAV, {
      screen: OFFSETS_NAV,
      params: {
        screen: PORTFOLIO_SELECTION_SCREEN,
      },
    });

  const subscriptionOverview = ({ portfolioId, isActive, ...params }) =>
    navigation.navigate(MAIN_NAV, {
      screen: OFFSETS_NAV,
      params: {
        screen: SUBSCRIPTION_OVERVIEW_SCREEN,
        params: {
          portfolioId,
          isActive,
          ...params,
        },
      },
    });
  const purchaseAgreement = ({ portfolioId, ...params }) =>
    navigation.navigate(MAIN_NAV, {
      screen: OFFSETS_NAV,
      params: {
        screen: PURCHASE_AGREEMENT_SCREEN,
        params: { portfolioId, ...params },
      },
    });
  const cardDetails = ({ portfolioId, ...params }) =>
    navigation.navigate(MAIN_NAV, {
      screen: OFFSETS_NAV,
      params: {
        screen: CARD_DETAILS_SCREEN,
        params: { portfolioId, ...params },
      },
    });
  const paymentNotification = ({ type, ...params }) =>
    navigation.navigate(MAIN_NAV, {
      screen: OFFSETS_NAV,
      params: {
        screen: PAYMENT_NOTIFICATION_SCREEN,
        params: { type: type, ...params },
      },
    });
  const cancelSubscription = ({ subscriptionId, ...params }) =>
    navigation.navigate(MAIN_NAV, {
      screen: OFFSETS_NAV,
      params: {
        screen: CANCEL_SUBSCRIPTION_SCREEN,
        params: { subscriptionId: subscriptionId, ...params },
      },
    });
  const dashboard = (id) =>
    navigation.navigate(MAIN_NAV, {
      screen: BOTTOM_TABS_NAV,
      params: {
        screen: DASHBOARD_SCREEN,
      },
    });
  const notificationScreen = (params) =>
    navigation.navigate(ROOT_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME,
      params: params,
    });

  const back = navigation.canGoBack() ? navigation.goBack : dashboard;

  const goTo = {
    back,
    autoOffset,
    portfolioSelection,
    subscriptionOverview,
    purchaseAgreement,
    cardDetails,
    paymentNotification,
    cancelSubscription,
    dashboard,
    notificationScreen,
  };

  return goTo;
}

export default useOffsetNav;
