import { useNavigation } from '@react-navigation/native';
import { curry, equals, findIndex } from 'ramda';

import {
  SIGN_UP_NAVIGATOR,
  APP_NAVIGATOR,
  AUTH_NAVIGATOR,
  ROOT_NAVIGATOR,
  ACCOUNT_SETUP_NAVIGATOR,
  MAIN_NAVIGATOR,
  ADD_ACTIVITY_NAVIGATOR,
  FOOTPRINT_NAVIGATOR,
  screens,
} from 'constants/routes';
import authService from 'utils/auth';
import { isNotDefined } from 'utils/ramda';

const STATUSES = [
  'created',
  'phone_confirmed',
  'registered',
  'chose',
  'assigned',
  'confirmed',
];

export const checkState = curry((state, me) => {
  const targetIndex = findIndex(equals(state), STATUSES);
  const myStatusIndex = findIndex(equals(me.state), STATUSES);

  return myStatusIndex >= targetIndex;
});

export const isCreated = checkState('created');
export const isPhoneConfirmed = checkState('phone_confirmed');
export const isRegistered = checkState('registered');
export const isChose = checkState('chose');
export const isAssigned = checkState('assigned');
export const isConfirmed = checkState('confirmed');

export const useStatusNavigation = () => {
  const navigation = useNavigation();

  const navToOnBoarding = () =>
    navigation.replace(APP_NAVIGATOR.NAME, {
      screen: APP_NAVIGATOR.ONBOARDING_SCREEN.NAME,
    });

  const navToTour = () => navigation.replace(...screens.tour());

  const navToWelcome = () => navigation.replace(...screens.welcome());

  const navToBottomTabsAccount = (params) =>
    navigation.replace(...screens.dashboard(params));

  const navToMobileVereficationForm = () =>
    navigation.replace(APP_NAVIGATOR.NAME, {
      screen: AUTH_NAVIGATOR.NAME,
      params: {
        screen: SIGN_UP_NAVIGATOR.NAVIGATOR_NAME.NAME,
        params: {
          screen: SIGN_UP_NAVIGATOR.SCREENS.MOBILE_VEREFICATION_FORM.NAME,
        },
      },
    });

  const navToAccountSetupRegisterStep = () =>
    navigation.replace(APP_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.NAME,
      params: {
        screen: ACCOUNT_SETUP_NAVIGATOR.NAVIGATOR_NAME.NAME,
        params: {
          screen: ACCOUNT_SETUP_NAVIGATOR.SCREENS.REGISTER_STEP.NAME,
        },
      },
    });

  const navToAccountSetupChooseProjectStep = () =>
    navigation.replace(APP_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.NAME,
      params: {
        screen: ACCOUNT_SETUP_NAVIGATOR.NAVIGATOR_NAME.NAME,
        params: {
          screen: ACCOUNT_SETUP_NAVIGATOR.SCREENS.CHOOSE_PROJECTS_STEP.NAME,
        },
      },
    });

  const navToAccountSetupAssignProjectStep = () =>
    navigation.replace(APP_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.NAME,
      params: {
        screen: ACCOUNT_SETUP_NAVIGATOR.NAVIGATOR_NAME.NAME,
        params: {
          screen: ACCOUNT_SETUP_NAVIGATOR.SCREENS.ASSIGN_STEP.NAME,
        },
      },
    });

  const navToAccountSetupConfirmStep = () =>
    navigation.replace(APP_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.NAME,
      params: {
        screen: ACCOUNT_SETUP_NAVIGATOR.NAVIGATOR_NAME.NAME,
        params: {
          screen: ACCOUNT_SETUP_NAVIGATOR.SCREENS.CONFIRM_STEP.NAME,
        },
      },
    });

  const navToProjects = () => {
    navigation.replace(APP_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.NAME,
      params: {
        screen: MAIN_NAVIGATOR.NAME,
        params: {
          screen: ADD_ACTIVITY_NAVIGATOR.NAME,
          params: {
            screen: ADD_ACTIVITY_NAVIGATOR.SCREENS.PROJECTS_OVERVIEW_MODAL.NAME,
          },
        },
      },
    });
  };

  const navToAddFootprintActivity = () => {
    navigation.replace(APP_NAVIGATOR.NAME, {
      screen: ROOT_NAVIGATOR.NAME,
      params: {
        screen: MAIN_NAVIGATOR.NAME,
        params: {
          screen: ADD_ACTIVITY_NAVIGATOR.NAME,
          params: {
            screen: FOOTPRINT_NAVIGATOR.NAVIGATOR_NAME.NAME,
            params: {
              screen: FOOTPRINT_NAVIGATOR.SCREENS.MANUAL_FORM_SCREEN,
            },
          },
        },
      },
    });
  };

  // const navToProjectDescriptionModal = () => {
  //   navigation.navigate(APP_NAVIGATOR.NAME, {
  //     screen: ROOT_NAVIGATOR.NAME,
  //     params: {
  //       screen: ROOT_NAVIGATOR.SCREENS.PROJECT_DESCRIPTION_MODAL.NAME,
  //       params: {
  //         project: {
  //           id: '3756',
  //         },
  //         // onAddPotfolio: () => addOrRemoveProjectId(projectId),
  //         // onAddPotfolio: () => addOrRemoveProjectId(projectId),
  //         isAddedToPortfolio: false,

  //         actionHandler: () => {
  //           console.log('@@');
  //           // navigation.goBack();
  //         },
  //       },
  //     },
  //   });
  // };

  const navigateTo = {
    home: navToBottomTabsAccount,
    welcome: navToWelcome,
    tour: navToTour,
  };

  // const initializer = async () => {

  // }

  const navByStatus = async (_me, _isLoading, params) => {
    // navToProjectDescriptionModal();
    // navToProjects();
    // return;

    if (_isLoading) {
      return;
    }

    if (isNotDefined(_me)) {
      //navToOnBoarding();
      const isTourCompleted = await authService.getIsTourCompleted();
      isTourCompleted ? navToWelcome() : navToTour();
      return;
    }

    if (_me?.id) {
      navToBottomTabsAccount(params);
      return;
    }

    if (isAssigned(_me)) {
      navToAccountSetupConfirmStep();
      return;
    }

    if (isChose(_me)) {
      navToAccountSetupAssignProjectStep();
      return;
    }

    if (isRegistered(_me)) {
      navToAccountSetupChooseProjectStep();
      return;
    }

    if (isPhoneConfirmed(_me)) {
      navToAccountSetupRegisterStep();
      return;
    }

    if (isCreated(_me)) {
      navToMobileVereficationForm();
      return;
    }

    //navToOnBoarding();
    navToTour();
  };

  return [navByStatus, navigateTo, navigation];
};
