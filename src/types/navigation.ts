
import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { ADD_ACTIVITY_NAVIGATOR, APP_NAVIGATOR, AUTH_NAVIGATOR, BASE_NAVIGATOR, BOTTOM_TABS_NAVIGATOR, MAIN_NAVIGATOR, OFFSETS_NAVIGATOR, PORTFOLIO_NAVIGATOR, ROOT_NAVIGATOR, SETTINGS_NAVIGATOR } from 'constants/routes';
import { NotificationType } from 'screens/NotificationScreen/common/renderIcon';
import { GestureResponderEvent } from 'react-native';
import { PaymentNotificationTypes } from 'screens/offsets/offsetInfoScreens/PaymentNotificationScreen';

type NotificationRouteParams = { type?: NotificationType, title?: string, subtitle?: string, onOverlayPress?: (event: GestureResponderEvent) => void, onActionPress?: (event: GestureResponderEvent) => void, onCancelPress?: (event: GestureResponderEvent) => void, showAction?: boolean, showCancel?: boolean } | undefined

export type BaseStackParamList = {
  [BASE_NAVIGATOR.APP_NAVIGATOR.NAME]: NavigatorScreenParams<AppStackParamList>;
  [BASE_NAVIGATOR.SPLASH_SCREEN.NAME]: undefined
  [BASE_NAVIGATOR.NOT_FOUND_SCREEN.NAME]: undefined
}
export type AppStackParamList = {
  [APP_NAVIGATOR.TOUR_SCREEN.NAME]: undefined
  [APP_NAVIGATOR.AUTH_NAVIGATOR.NAME]: NavigatorScreenParams<AuthStackParamList>;
  [APP_NAVIGATOR.ROOT_NAVIGATOR.NAME]: NavigatorScreenParams<RootStackParamList>;
}
export type AuthStackParamList = {
  [AUTH_NAVIGATOR.SIGN_IN_SCREEN.NAME]: undefined
  [AUTH_NAVIGATOR.SIGN_UP_SCREEN.NAME]: undefined
  [AUTH_NAVIGATOR.VERIFY_SCREEN.NAME]:  { id: string, refreshToken: string }
  [AUTH_NAVIGATOR.FORGOT_PASSWORD_SCREEN.NAME]: { email: string } | undefined
  [AUTH_NAVIGATOR.LOADER_MODAL_SCREEN.NAME]: { onFinish: () => void } | undefined
  [AUTH_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME]: NotificationRouteParams
}
export type RootStackParamList = {
  [ROOT_NAVIGATOR.MAIN_NAVIGATOR.NAME]: NavigatorScreenParams<MainStackParamList>;
  [ROOT_NAVIGATOR.NOTIFICATION_MODAL_SCREEN.NAME]: NotificationRouteParams
  [ROOT_NAVIGATOR.LOADER_MODAL_SCREEN.NAME]: { onFinish: () => void }
  [ROOT_NAVIGATOR.DISABLED_LOADER_MODAL_SCREEN.NAME]: undefined
};
export type MainStackParamList = {
  [MAIN_NAVIGATOR.BOTTOM_TABS_NAVIGATOR.NAME]: NavigatorScreenParams<BottomTabParamList>
  [MAIN_NAVIGATOR.SETTINGS_NAVIGATOR.NAME]: NavigatorScreenParams<SettingsStackParamList>
  [MAIN_NAVIGATOR.OFFSETS_NAVIGATOR.NAME]: NavigatorScreenParams<OffsetStackParamList>
  [MAIN_NAVIGATOR.ADD_ACTIVITY_NAVIGATOR.NAME]: NavigatorScreenParams<AddActivityStackParamList>
  [MAIN_NAVIGATOR.PORTFOLIO_NAVIGATOR.NAME]: NavigatorScreenParams<PortfolioStackParamList>
}
export type BottomTabParamList = {
  [BOTTOM_TABS_NAVIGATOR.DASHBOARD_SCREEN.NAME]: undefined
  [BOTTOM_TABS_NAVIGATOR.PROJECT_DISCOVERY_SCREEN.NAME]: undefined
}
export type SettingsStackParamList = {
  [SETTINGS_NAVIGATOR.MENU_SCREEN.NAME]: undefined
  [SETTINGS_NAVIGATOR.CARBON_CODE_SCREEN.NAME]: undefined
  [SETTINGS_NAVIGATOR.SETTINGS_SCREEN.NAME]: undefined
  [SETTINGS_NAVIGATOR.PROFILE_SCREEN.NAME]: undefined
}
export type OffsetStackParamList = {
  [OFFSETS_NAVIGATOR.AUTO_OFFSET_SCREEN.NAME]: { selectedPortfolioId: number }
  [OFFSETS_NAVIGATOR.SELECT_PORTFOLIO_SCREEN.NAME]: undefined
  [OFFSETS_NAVIGATOR.SUBSCRIPTION_OVERVIEW_SCREEN.NAME]: { portfolioId: number, isActive?: boolean }
  [OFFSETS_NAVIGATOR.CONFIRM_SUBSCRIPTION_SCREEN.NAME]: { setTermsAgreed?: (bool: boolean) => void } | undefined
  [OFFSETS_NAVIGATOR.CARD_DETAILS_SCREEN.NAME]: { portfolioId: number }
  [OFFSETS_NAVIGATOR.PAYMENT_NOTIFICATION_SCREEN.NAME]: { type?: PaymentNotificationTypes, body?: string } | undefined
  [OFFSETS_NAVIGATOR.CANCEL_SUBSCRIPTION_SCREEN.NAME]: { subscriptionId: string}
}
export type AddActivityStackParamList = {
  [ADD_ACTIVITY_NAVIGATOR.ADD_ACTIVITY_SCREEN.NAME]: { groupCode: string }
  [ADD_ACTIVITY_NAVIGATOR.SELECT_ACTIVITY_MODAL_SCREEN.NAME]: undefined
}
export type PortfolioStackParamList = {
  [PORTFOLIO_NAVIGATOR.PROJECT_DISCOVERY_SCREEN.NAME]: undefined
  [PORTFOLIO_NAVIGATOR.PORTFOLIO_OVERVIEW_SCREEN.NAME]: {id: number}
  [PORTFOLIO_NAVIGATOR.PROJECT_OVERVIEW_SCREEN.NAME]: {id: number, category: string}
  [PORTFOLIO_NAVIGATOR.COMING_SOON_SCREEN.NAME]: undefined
}


export type BaseStackRouteProp<T extends keyof BaseStackParamList> = RouteProp<BaseStackParamList, T>;
export type BaseStackNavigationProp<T extends keyof BaseStackParamList> =
  StackNavigationProp<BaseStackParamList, T>;

export type AppStackRouteProp<T extends keyof AppStackParamList> = RouteProp<AppStackParamList, T>;
export type AppStackNavigationProp<T extends keyof AppStackParamList> =
CompositeNavigationProp<
  StackNavigationProp<AppStackParamList, T>,
  BaseStackNavigationProp<keyof BaseStackParamList>
>;
type AppStackCompositeNavigationProp = CompositeNavigationProp<
AppStackNavigationProp<keyof AppStackParamList>,
BaseStackNavigationProp<keyof BaseStackParamList>
>

export type AuthStackRouteProp<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>;
export type AuthStackNavigationProp<T extends keyof AuthStackParamList> =
CompositeNavigationProp<
  StackNavigationProp<AuthStackParamList, T>,
  AppStackCompositeNavigationProp
>;

export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, T>,
  AppStackCompositeNavigationProp
>;
type RootCompositeNavigationProp = CompositeNavigationProp<
RootStackNavigationProp<keyof RootStackParamList>,
AppStackCompositeNavigationProp
>

export type MainStackRouteProp<T extends keyof MainStackParamList> = RouteProp<MainStackParamList, T>;
export type MainStackNavigationProp<T extends keyof MainStackParamList> =
CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, T>,
  RootCompositeNavigationProp
>;
type MainStackCompositeNavigationProp = CompositeNavigationProp<
MainStackNavigationProp<keyof MainStackParamList>,
RootCompositeNavigationProp
>

export type BottomTabRouteProp<T extends keyof BottomTabParamList> = RouteProp<BottomTabParamList, T>;
export type BottomTabsNavigationProp<T extends keyof BottomTabParamList> =
CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, T>,
  MainStackCompositeNavigationProp
>;

export type SettingsStackRouteProp<T extends keyof SettingsStackParamList> = RouteProp<SettingsStackParamList, T>;
export type SettingsStackNavigationProp<T extends keyof SettingsStackParamList> =
CompositeNavigationProp<
  StackNavigationProp<SettingsStackParamList, T>,
  MainStackCompositeNavigationProp
>;

export type OffsetStackRouteProp<T extends keyof OffsetStackParamList> = RouteProp<OffsetStackParamList, T>;
export type OffsetStackNavigationProp<T extends keyof OffsetStackParamList> =
CompositeNavigationProp<
  StackNavigationProp<OffsetStackParamList, T>,
  MainStackCompositeNavigationProp
>;

export type AddActivityStackRouteProp<T extends keyof AddActivityStackParamList> = RouteProp<AddActivityStackParamList, T>;
export type AddActivityStackNavigationProp<T extends keyof AddActivityStackParamList> =
CompositeNavigationProp<
  StackNavigationProp<AddActivityStackParamList, T>,
  MainStackCompositeNavigationProp
>;

export type PortfolioStackRouteProp<T extends keyof PortfolioStackParamList> = RouteProp<PortfolioStackParamList, T>;
export type PortfolioStackNavigationProp<T extends keyof PortfolioStackParamList> =
CompositeNavigationProp<
  StackNavigationProp<PortfolioStackParamList, T>,
  MainStackCompositeNavigationProp
>;

// Specifying a global type for the root (Base) navigator would avoid manual annotations in many places
declare global {
  namespace ReactNavigation {
    interface RootParamList extends BaseStackParamList {}
  }
}

  
// // TODO: Add composite ScreenProps types when upgrading to react navigation v6
// export type AppStackScreenProps<T extends keyof AppStackParamList> =
//   CompositeScreenProps<
//     StackScreenProps<AppStackParamList, T>,
//     BaseStackScreenProps<keyof BaseStackParamList>
//   >;

// type AppStackCompositeScreenProps = CompositeScreenProps<
//   AppStackScreenProps<keyof AppStackParamList>,
//   BaseStackScreenProps<keyof BaseStackParamList>
// >

// export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
//   CompositeScreenProps<
//     StackScreenProps<AuthStackParamList, T>,
//     AppStackCompositeScreenProps
//   >;

// export type RootStackScreenProps<T extends keyof RootStackParamList> =
//   CompositeScreenProps<
//     StackScreenProps<RootStackParamList, T>,
//     AppStackCompositeScreenProps
//   >;

// type RootCompositeScreenProps = CompositeScreenProps<
//   RootStackScreenProps<keyof RootStackParamList>,
//   AppStackCompositeScreenProps
// >

// export type MainStackScreenProps<T extends keyof MainStackParamList> =
//   CompositeScreenProps<
//     StackScreenProps<MainStackParamList, T>,
//     RootCompositeScreenProps
//   >;

// type MainStackCompositeScreenProps = CompositeScreenProps<
//   MainStackScreenProps<keyof MainStackParamList>,
//   RootCompositeScreenProps
// >

// type MainCompositeGeneric<ParamList extends ParamListBase, T extends keyof ParamList> = CompositeScreenProps<
//   StackScreenProps<ParamList, T>,
//   MainStackCompositeScreenProps
// >;

// export type BottomTabScreenProps<T extends keyof BottomTabParamList> =
//   CompositeScreenProps<
//     BottomTabScreenProps<BottomTabParamList, T>,
//     MainStackCompositeScreenProps
//   >;

// export type SettingsStackScreenProps<T extends keyof SettingsStackParamList> =
//   CompositeScreenProps<
//     StackScreenProps<SettingsStackParamList, T>,
//     MainStackCompositeScreenProps
//   >;

// export type OffsetStackScreenProps<T extends keyof OffsetStackParamList> =
//   CompositeScreenProps<
//     StackScreenProps<OffsetStackParamList, T>,
//     MainStackCompositeScreenProps
//   >;
// export type AddActivityStackScreenProps<T extends keyof AddActivityStackParamList> =
//   CompositeScreenProps<
//     StackScreenProps<AddActivityStackParamList, T>,
//     MainStackCompositeScreenProps
//   >;
// export type PortfolioStackScreenProps<T extends keyof PortfolioStackParamList> =
//   CompositeScreenProps<
//     StackScreenProps<PortfolioStackParamList, T>,
//     MainStackCompositeScreenProps
//   >;
