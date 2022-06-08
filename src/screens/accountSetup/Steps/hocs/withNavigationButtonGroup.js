import React from 'react';

import {
  useRoute,
  useNavigationState,
  useNavigation,
} from '@react-navigation/native';
import {
  always,
  equals,
  add,
  findIndex,
  nth,
  pipe,
  values,
  head,
  // when,
  ifElse,
  // apply,
  map,
} from 'ramda';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import Button from 'components/Button';
import colors from 'constants/colors';
import {
  ACCOUNT_SETUP_NAVIGATOR,
  // BOTTOM_TABS_NAVIGATOR,
  // MAIN_NAVIGATOR,
  // ROOT_NAVIGATOR,
} from 'constants/routes';
import { getIn, isNotDefined } from 'utils/ramda';
import translator from 'utils/translator';

export default (WrappedComponent) => (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  // console.log('onSubmitHandler', props.onSubmitHandler);
  const currentScreenIndex = pipe(
    getIn('SCREENS'),
    map(getIn('NAME')),
    values,
    findIndex(equals(props.route.name)),
  )(ACCOUNT_SETUP_NAVIGATOR);

  // const nextScreenRouteName = pipe(
  //   getIn('SCREENS'),
  //   map(getIn('NAME')),
  //   values,
  //   nth(add(1, currentScreenIndex))
  //   // when(isNotDefined, always(...getPath('BOTTOM_TABS.SCREENS.PROFILE')))
  // )(ACCOUNT_SETUP_NAVIGATOR);

  const prevScreenRouteName = pipe(
    getIn('SCREENS'),
    map(getIn('NAME')),
    values,
    ifElse(
      always(equals(currentScreenIndex, 0)),
      always(null),
      nth(add(-1, currentScreenIndex)),
    ),
  )(ACCOUNT_SETUP_NAVIGATOR);

  const isFirstRouteInParent = useNavigationState(
    pipe(getIn('routes'), head, getIn('key'), equals(route.key)),
  );

  const goToPrevScreen = () => {
    if (isFirstRouteInParent) {
      props.navigation.reset({
        index: currentScreenIndex,
        routes: [{ name: prevScreenRouteName }],
      });

      return;
    }

    goBack();
  };

  // const goToProfile = () =>
  //   props.navigation.navigate(ROOT_NAVIGATOR.NAME, {
  //     screen: MAIN_NAVIGATOR.NAME,
  //     params: {
  //       screen: BOTTOM_TABS_NAVIGATOR.NAME,
  //       params: {
  //         screen: BOTTOM_TABS_NAVIGATOR.DASHBOARD_SCREEN.NAME,
  //       },
  //     },
  //   });

  // const navToCodeCreditLoader = () =>
  //   props.navigation.navigate(ROOT_NAVIGATOR.NAME, {
  //     screen: ROOT_NAVIGATOR.LOADER_MODAL_SCREEN.NAME,
  //     params: {
  //       onFinish: goToProfile,
  //     },
  //   });
  // const navToCodeCreditLoader = partial(props.navigation.navigate, [
  //   routes.AUTH.SCREENS.MODALS.STACK_NAME,
  //   {
  //     screen: routes.AUTH.SCREENS.MODALS.SCREENS.CREDIT_LOADER,
  //     params: {
  //       onFinish: goToProfile,
  //     },
  //   },
  // ]);

  // const goToNextScreen = nextScreenRouteName
  //   ? partial(props.navigation.navigate, [nextScreenRouteName])
  //   : navToCodeCreditLoader;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={{ flex: 1 }}>
        <WrappedComponent {...props} currentScreenIndex={currentScreenIndex} />
      </View>
      <View style={styles.buttonGroup}>
        <View style={[styles.buttonWrapper, { paddingLeft: 15 }]}>
          <Button
            mode="dark"
            onPressHandler={goToPrevScreen}
            isDisabled={isNotDefined(prevScreenRouteName)}>
            {translator.translate('setupAccount.buttons.back')}
          </Button>
        </View>

        <View style={styles.buttonWrapper}>
          <Button onPressHandler={props.onSubmitHandler}>
            {translator.translate('setupAccount.buttons.next')}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

// styles
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  buttonGroup: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  buttonWrapper: {
    flex: 1,
    paddingRight: 15,
  },
});
