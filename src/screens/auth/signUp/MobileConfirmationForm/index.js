import React, { Fragment, useEffect, useState } from 'react';

import { partial, pipe } from 'ramda';
// import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import Button from 'components/Button';
import Typography from 'components/Typography';
import colors from 'constants/colors';
import translator from 'utils/translator';

import { withLayout, withThemeProvider } from '../../hocs';

import { FIELDS } from './constants';
import { CELL_COUNT } from './constants';
import withMutation from './hocs/withMutation';
import withQuery from './hocs/withQuery';
import withState from './hocs/withState';

const propTypes = {};

const defaultProps = {};

function MobileConfirmationForm({
  goToNotificationScreen,
  getFormParam,
  setFormParam,
  onSubmitHandler,
  me,
}) {
  const ref = useBlurOnFulfill({
    value: getFormParam(FIELDS.VEREFICATION_CODE.NAME),
    cellCount: CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: getFormParam(FIELDS.VEREFICATION_CODE.NAME),
    setValue: setFormParam(FIELDS.VEREFICATION_CODE.NAME),
  });

  // const navToSetupAccount = partial(navigation.navigate, [
  //   routes.AUTH.SCREENS.ACCOUNT_SETUP.STACK_NAME,
  // ]);

  // const navToCodeCreditLoader = partial(navigation.navigate, [
  //   routes.AUTH.SCREENS.MODALS.STACK_NAME,
  //   {
  //     screen: routes.AUTH.SCREENS.MODALS.SCREENS.CREDIT_LOADER,
  //     params: {
  //       onFinish: navToSetupAccount,
  //     },
  //   },
  // ]);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref]);

  return (
    <Fragment>
      <View style={{ flex: 1 }}>
        <View style={[styles.contentBlock, styles.intro]}>
          <Typography theme="dark">
            {translator.translate('signUp.mobileConfirmationForm.title')}
          </Typography>
          <Typography theme="dark" type="text">
            {`${translator.translate('signUp.mobileConfirmationForm.sentTo')} ${
              me?.mobileNumber
            }`}
          </Typography>
        </View>

        <View style={[styles.contentBlock, styles.mainBlock]}>
          <CodeField
            ref={ref}
            {...props}
            value={getFormParam(FIELDS.VEREFICATION_CODE.NAME)}
            onChangeText={setFormParam(FIELDS.VEREFICATION_CODE.NAME)}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
      </View>

      <View style={[styles.contentBlock, { paddingBottom: 10 }]}>
        <Button onPressHandler={onSubmitHandler} mode="dark">
          {translator.translate('signUp.mobileConfirmationForm.buttons.submit')}
        </Button>

        <TouchableOpacity
          onPress={() =>
            goToNotificationScreen({
              title: translator.translate('modals.comingSoon.title'),
              subtitle: translator.translate('modals.comingSoon.subtitle'),
              type: 'warning',
            })
          }>
          <View style={[styles.contentBlock, { alignItems: 'center' }]}>
            <Typography
              theme="dark"
              type="h6"
              style={{ textTransform: 'uppercase' }}>
              {translator.translate(
                'signUp.mobileConfirmationForm.buttons.resendCode'
              )}
            </Typography>
          </View>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
}

MobileConfirmationForm.defaultProps = defaultProps;
MobileConfirmationForm.propTypes = propTypes;
export default pipe(
  withLayout,
  withThemeProvider,
  // ----- //
  withState,
  withQuery,
  withMutation
)(MobileConfirmationForm);

// styles
const styles = StyleSheet.create({
  contentBlock: {
    marginVertical: 15,
  },

  appendix: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBlock: {
    // marginTop: 25,
    marginBottom: 25

    // padding: 20,
    // minHeight: 300,
  },
  appendixText: {
    textTransform: 'uppercase',
    opacity: 1,
  },

  intro: {
    marginBottom: 25,
  },

  codeFieldRoot: {
    width: '100%'
    // marginLeft: 10,
    // marginRight: 10,
  },
  cellRoot: {
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: colors.WHITE,
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
});
