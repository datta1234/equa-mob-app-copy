const PORTFOLIO_NAVIGATOR = {
  NAME: 'PortfolioNave',
  LABEL: '',
  PROJECT_DISCOVERY_SCREEN: {
    NAME: 'ProjectDiscoveryScreen',
    LABEL: 'Project Discovery',
  },
  PORTFOLIO_OVERVIEW_SCREEN: {
    NAME: 'PortfolioOverviewScreen',
    LABEL: 'Portfolio Overview',
  },
  PROJECT_OVERVIEW_SCREEN: {
    NAME: 'ProjectOverviewScreen',
    LABEL: 'Project Overview',
  },
  COMING_SOON_SCREEN: {
    NAME: 'ComingSoonScreen',
    LABEL: 'Offsets Coming Soon',
  },
} as const;

const ADD_ACTIVITY_NAVIGATOR = {
  NAME: 'AddActivityNav',
  LABEL: 'Add Activity',
  ADD_ACTIVITY_SCREEN: {
    NAME: 'AddActivityScreen',
    LABEL: 'Add an Activity',
  },
  SELECT_ACTIVITY_MODAL_SCREEN: {
    NAME: 'SelectActivityModal',
    LABEL: 'Select an Activity',
  },
    /// TODO: JR REMOVE ////////////////////
  SCREENS: {
    FOOTPRINT_NAVIGATOR,
    PROJECTS_OVERVIEW_MODAL: {
      NAME: 'projects_overview_modal',
      LABEL: '',
    },
    SELECT_FOOTPRINT_ACTIVITY_MODAL: {
      NAME: 'select_footprint_activity_modal',
      LABEL: '',
    },
    MANUAL_INPUT_MODAL: {
      NAME: 'manual_input_modal',
      LABEL: '',
    },
  },
  /////////////////////////////////////////
} as const;

const OFFSETS_NAVIGATOR = {
  NAME: 'OffsetsNav',
  LABEL: 'Offsets',
  AUTO_OFFSET_SCREEN: {
    NAME: 'AutoOffsetScreen',
    LABEL: 'Auto Offset',
  },
  SELECT_PORTFOLIO_SCREEN: {
    NAME: 'SelectPortfolioScreen',
    LABEL: 'Select Your Portfolio',
  },
  SUBSCRIPTION_OVERVIEW_SCREEN: {
    NAME: 'SubscriptionOverviewScreen',
    LABEL: 'Subscription Overview',
  },
  CONFIRM_SUBSCRIPTION_SCREEN: {
    NAME: 'ConfirmSubscriptionScreen',
    LABEL: 'Confirm Subscription',
  },
  CARD_DETAILS_SCREEN: {
    NAME: 'CardDetailsScreen',
    LABEL: 'Payment',
  },
  PAYMENT_NOTIFICATION_SCREEN: {
    NAME: 'PaymentNotificationScreen',
    LABEL: 'Auto Offsets',
  },
  CANCEL_SUBSCRIPTION_SCREEN: {
    NAME: 'CancelSubscriptionScreen',
    LABEL: 'Auto Offsets',
  },
} as const;

const SETTINGS_NAVIGATOR = {
  NAME: 'SettingsNav',
  LABEL: 'Settings',
  MENU_SCREEN: {
    NAME: 'MenuScreen',
    LABEL: 'Menu',
  },
  CARBON_CODE_SCREEN: {
    NAME: 'CarbonCodeScreen',
    LABEL: 'Carbon Code',
  },
  SETTINGS_SCREEN: {
    NAME: 'SettingsScreen',
    LABEL: 'Settings',
  },
  PROFILE_SCREEN: {
    NAME: 'ProfileScreen',
    LABEL: 'Profile',
  },
} as const;

const BOTTOM_TABS_NAVIGATOR = {
  NAME: 'TabsNav',
  LABEL: 'Home',
  DASHBOARD_SCREEN: {
    NAME: 'DashboardScreen',
    LABEL: 'Dashboard',
  },
  PROJECT_DISCOVERY_SCREEN: {
    NAME: 'ProjectDiscoveryScreen',
    LABEL: 'Project Discovery',
  },
  PROFILE_SCREEN: {
    NAME: 'ProfileScreen',
    LABEL: 'Profile',
  },
  // ADD_ACTIVITY_SCREEN: {
    //   NAME: 'addActivity_screen',
    //   LABEL: '',
    // },
    DISCOVER_SCREEN: {
      NAME: 'discover_screen',
      LABEL: 'Discover',
    },
    /// TODO: JR REMOVE ////////////////////
    NEWS_FEED_SCREEN: {
      NAME: 'news_feed_screen',
      LABEL: 'News',
    },
  /////////////////////////////////////////
} as const;

const MAIN_NAVIGATOR = {
  NAME: 'MainNav',
  LABEL: 'Main',
  BOTTOM_TABS_NAVIGATOR,
  SETTINGS_NAVIGATOR,
  OFFSETS_NAVIGATOR,
  ADD_ACTIVITY_NAVIGATOR,
  PORTFOLIO_NAVIGATOR,
  /// TODO: JR REMOVE ////////////////////
  SCREENS: {
    MANUAL_INPUT_MODAL: {
      NAME: 'manual_input_modal',
      LABEL: '',
    },
  },
  /////////////////////////////////////////
} as const;

const ROOT_NAVIGATOR = {
  NAME: 'RootNav',
  LABEL: 'Root',
  MAIN_NAVIGATOR: MAIN_NAVIGATOR,
  NOTIFICATION_MODAL_SCREEN: {
    NAME: 'NotificationModal',
    LABEL: 'Notification',
  },
  LOADER_MODAL_SCREEN: {
    NAME: 'LoaderModal',
    LABEL: 'Loader',
  },
  DISABLED_LOADER_MODAL_SCREEN: {
    NAME: 'DisabledLoaderModal',
    LABEL: 'DisabledLoader',
  },
  /// TODO: JR REMOVE ////////////////////
  SCREENS: {
    ACCOUNT_SETUP_NAVIGATOR,
    PROJECT_DESCRIPTION_MODAL: {
      NAME: 'project_description_modal',
      LABEL: '',
    },
  },
  /////////////////////////////////////////
} as const;

const AUTH_NAVIGATOR = {
  NAME: 'AuthNav',
  LABEL: 'Auth',
  SIGN_IN_SCREEN: {
    NAME: 'SignInScreen',
    LABEL: 'Login',
  },
  SIGN_UP_SCREEN: {
    NAME: 'SignUpScreen',
    LABEL: 'Create Account',
  },
  VERIFY_SCREEN: {
    NAME: 'VerificationScreen',
    LABEL: 'Verification',
  },
  FORGOT_PASSWORD_SCREEN: {
    NAME: 'ForgotPasswordScreen',
    LABEL: 'Forgot Password',
  },
  LOADER_MODAL_SCREEN: {
    NAME: 'AuthLoaderModal',
    LABEL: 'Auth Loader',
  },
  NOTIFICATION_MODAL_SCREEN: {
    NAME: 'NotificationModal',
    LABEL: 'Notification',
  },
  /// TODO: JR REMOVE ////////////////////
  SCREENS: {
    SIGN_UP_NAVIGATOR,
    SIGN_IN_NAVIGATOR,
  },
  /////////////////////////////////////////
} as const;

const APP_NAVIGATOR = {
  NAME: 'AppNav',
  LABEL: 'App',
  AUTH_NAVIGATOR,
  ROOT_NAVIGATOR,
  TOUR_SCREEN: {
    NAME: 'TourScreen',
    LABEL: 'Tour',
  },
  /// TODO: JR REMOVE ///////////
  ONBOARDING_SCREEN: {
    NAME: 'onboarding_screen',
    LABEL: '',
  },
  /////////////////////////////
} as const;

const BASE_NAVIGATOR = {
  NAME: 'BaseNav',
  LABEL: 'Base',
  APP_NAVIGATOR: APP_NAVIGATOR,
  SPLASH_SCREEN: {
    NAME: 'SplashScreen',
    LABEL: 'Splash',
  },
  NOT_FOUND_SCREEN: {
    NAME: 'NotFoundScreen',
    LABEL: 'Not Found',
  },
} as const;


///// TODO: JR TO REMOVE ///////////////////////////
  const SIGN_UP_NAVIGATOR = {
    NAVIGATOR_NAME: {
      NAME: 'sign_up_navigator',
      LABEL: '',
    },
    SCREENS: {
      CREDENTIALS_FORM: {
        NAME: 'sign_up_credentials_form',
        LABEL: '',
      },
      MOBILE_VEREFICATION_FORM: {
        NAME: 'mobile_verefication_form',
        LABEL: '',
      },
    },
  };

  const SIGN_IN_NAVIGATOR = {
    NAVIGATOR_NAME: {
      NAME: 'sign_in_navigator',
      LABEL: '',
    },
    SCREENS: {
      CREDENTIALS_FORM: {
        NAME: 'sign_in_credentials_form',
        LABEL: '',
      },
    },
  };

  const ACCOUNT_SETUP_NAVIGATOR = {
    NAVIGATOR_NAME: {
      NAME: 'account_setup_navigator',
      LABEL: '',
    },
    SCREENS: {
      REGISTER_STEP: {
        NAME: 'register_step_screen',
        LABEL: '',
      },
      CHOOSE_PROJECTS_STEP: {
        NAME: 'choose_projects_step_screen',
        LABEL: '',
      },
      ASSIGN_STEP: {
        NAME: 'assign_step_screen',
        LABEL: '',
      },
      CONFIRM_STEP: {
        NAME: 'confirm_screen',
        LABEL: '',
      },
    },
  };

  const FOOTPRINT_NAVIGATOR = {
    NAVIGATOR_NAME: {
      NAME: 'footprint_navigator',
      LABEL: '',
    },
    SCREENS: {
      MANUAL_FORM_SCREEN: {
        NAME: 'activityInputForm',
        LABEL: '',
      },
      QR_SCANNER_SCREEN: {
        NAME: 'activityInputQrScanner',
        LABEL: '',
      },
      SYNC_APPS_SCREEN: {
        NAME: 'activityInputSyncApps',
        LABEL: '',
      },

      UBER_AUTH: {
        NAME: 'activityInputUberAuth',
        LABEL: 'Uber',
      },
    },
  };
///////////////////////////////////////////////////////////

export {
  BASE_NAVIGATOR,
  APP_NAVIGATOR,
  ROOT_NAVIGATOR,
  MAIN_NAVIGATOR,
  SETTINGS_NAVIGATOR,
  OFFSETS_NAVIGATOR,
  PORTFOLIO_NAVIGATOR,
  BOTTOM_TABS_NAVIGATOR,
  ADD_ACTIVITY_NAVIGATOR,
  ACCOUNT_SETUP_NAVIGATOR,
  AUTH_NAVIGATOR,
  SIGN_UP_NAVIGATOR,
  SIGN_IN_NAVIGATOR,
  FOOTPRINT_NAVIGATOR,
};

const screens = {
  welcome: (params) => [
    APP_NAVIGATOR.NAME,
    {
      screen: AUTH_NAVIGATOR.NAME,
      params: {
        screen: AUTH_NAVIGATOR.SIGN_IN_SCREEN.NAME,
        params,
      },
    },
  ],
  tour: (params) => [
    APP_NAVIGATOR.NAME,
    {
      screen: APP_NAVIGATOR.TOUR_SCREEN.NAME,
      params,
    },
  ],
  dashboard: (params) => [
    APP_NAVIGATOR.NAME,
    {
      screen: ROOT_NAVIGATOR.NAME,
      params: {
        screen: MAIN_NAVIGATOR.NAME,
        params: {
          screen: BOTTOM_TABS_NAVIGATOR.NAME,
          params: {
            screen: BOTTOM_TABS_NAVIGATOR.DASHBOARD_SCREEN.NAME,
            params,
          },
        },
      },
    },
  ],
};

export { screens };
