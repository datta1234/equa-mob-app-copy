import React, { useState, useEffect } from 'react';

// import PropTypes from 'prop-types';
import { gql, useQuery } from '@apollo/client';
import { nth, partialRight, pipe, tap } from 'ramda';
import { StyleSheet, View } from 'react-native';
import { delay } from 'rxjs/operators';

import Spinner from 'components/Spinner';
import { Text } from 'components/Typography';
import {
  AuthStackNavigationProp,
  AuthStackRouteProp,
  RootStackNavigationProp,
  RootStackRouteProp,
} from 'types/navigation';
import { useStatusNavigation } from 'utils/me';
// import { isNotDefined } from 'utils/ramda';
// import routes from 'constants/routes';
import translator from 'utils/translator';

import withLayout from '../hocs/withLayout';

import { $precentage } from './utils';
import { background } from 'constants/colors';

type Props = {
  route:
    | AuthStackRouteProp<'AuthLoaderModal'>
    | RootStackRouteProp<'LoaderModal'>;
  navigation:
    | AuthStackNavigationProp<'AuthLoaderModal'>
    | RootStackNavigationProp<'LoaderModal'>;
};

const GET_ME = gql`
  query Me {
    me {
      id
      state
      email
    }
  }
`;

const defaultProps = {};
function LoaderScreen({ navigation, route }: Props) {
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: 'no-cache',
  });

  const [navToByStatus] = useStatusNavigation(data?.me, { loading });

  const [percent, setPercent] = useState(0);
  const [text, setText] = useState(
    translator.translate('modals.loaderScreen.oneMoment'),
  );

  const TEXTS = {
    10: translator.translate('modals.loaderScreen.weStarted'),
    35: translator.translate('modals.loaderScreen.oneMoreThing'),
    85: translator.translate('modals.loaderScreen.processingYourRequest'),
    100: translator.translate('modals.loaderScreen.success'),
  };

  useEffect(() => {
    $precentage
      .pipe(delay(100))
      .subscribe(pipe(tap(setPercent), partialRight(nth, [TEXTS]), setText));
  }, []);

  // const navToApplication = partial(navigation.navigate, [
  //   routes.BOTTOM_TABS.STACK_NAME,
  // ]);

  // useEffect(() => {
  //   if (isNotDefined(data?.me)) {
  //     return;
  //   }

  //   navigation.goBack();
  //   navToByStatus(data?.me, loading);
  // }, [data?.me, loading]);

  useEffect(() => {
    if (percent >= 100) {
      setTimeout(() => {
        navigation.goBack();
        setTimeout(() => {
          route.params?.onFinish
            ? route.params?.onFinish()
            : navToByStatus(data?.me, loading);
        }, 0);
      }, 150);
    }
  }, [percent]);

  return (
    <View style={s.container}>
      <View style={s.spinContainer}>
        <Spinner />
        <Text style={s.text} color={'light'} center>
          {/* {text} */}
        </Text>
      </View>
      <View style={s.spacer} />
    </View>
  );
}
LoaderScreen.defaultProps = defaultProps;
export default LoaderScreen;

const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: background.dark,
  },
  spinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  text: {
    marginTop: 70,
    paddingHorizontal: 40,
  },
  spacer: {
    flex: 1,
  },
});
