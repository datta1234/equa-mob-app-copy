import React, { useState } from 'react';

import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import { curry } from 'ramda';

import LegalLinks from 'components/Legal';
import { scaleHeight } from 'constants/layout';
import useNotification from 'hooks/useNotification';
import { allSettled } from 'utils/helpers';
import permissionsService from 'utils/permissions';
import { getParam, setParam } from 'utils/ramda';

import { FIELDS } from '../constants';

const ConsentFooter = () => (
  <LegalLinks
    style={{ marginTop: scaleHeight(30), marginBottom: scaleHeight(10) }}
  />
);

export default (WrappedComponent) => {
  return ({ onSubmitHandler, ...rest }) => {
    const showModal = useNotification({ isAuth: true });
    const [formParams, setFormParams] = useState({
      [FIELDS.FIRST_NAME.NAME]: '',
      [FIELDS.LAST_NAME.NAME]: '',
      [FIELDS.EMAIL.NAME]: '',
      [FIELDS.EMAIL.ERROR]: '',
      [FIELDS.PASSWORD.NAME]: '',
      [FIELDS.PASSWORD.ERROR]: '',
      [FIELDS.REGION_ID.NAME]: null,
      [FIELDS.VOUCHER_CODE.NAME]: '',
    });

    function onParamsChange(input) {
      setFormParams(input);
    }

    const setFormParam = curry((lensKey, key) =>
      onParamsChange(setParam(formParams, lensKey, key)),
    );
    const getFormParam = getParam(formParams);

    const values = {
      firstName: getFormParam(FIELDS.FIRST_NAME.NAME),
      lastName: getFormParam(FIELDS.LAST_NAME.NAME),
      email: getFormParam(FIELDS.EMAIL.NAME),
      password: getFormParam(FIELDS.PASSWORD.NAME),
      regionId: getFormParam(FIELDS.REGION_ID.NAME),
      voucherCode: getFormParam(FIELDS.VOUCHER_CODE.NAME),
    };
    const setValue = {
      firstName: (val) => setFormParam(FIELDS.FIRST_NAME.NAME)(val),
      lastName: (val) => setFormParam(FIELDS.LAST_NAME.NAME)(val),
      email: (val) =>
        setFormParam(FIELDS.EMAIL.NAME)((val || ' ').toLowerCase().trim()),
      password: (val) => setFormParam(FIELDS.PASSWORD.NAME)(val),
      regionId: (val) => setFormParam(FIELDS.REGION_ID.NAME)(val),
      voucherCode: (val) => setFormParam(FIELDS.VOUCHER_CODE.NAME)(val)?.trim(),
    };

    const setError = {
      email: (error) => setFormParam(FIELDS.EMAIL.ERROR)(error),
      password: (error) => setFormParam(FIELDS.PASSWORD.ERROR)(error),
    };

    const clearError = {
      email: () => setFormParam(FIELDS.EMAIL.ERROR)(''),
      password: () => setFormParam(FIELDS.PASSWORD.ERROR)(''),
    };

    const errors = {
      email: getFormParam(FIELDS.EMAIL.ERROR),
      password: getFormParam(FIELDS.PASSWORD.ERROR),
    };

    async function updatePermissions(isAllowed) {
      //TODO: remove async permissionsService as this is device level permissions but can create inconsistencies with multiple users/ signins
      allSettled([
        permissionsService.setAnalyticsAllowed(isAllowed),
        permissionsService.setCrashStatsAllowed(isAllowed),
        crashlytics().setCrashlyticsCollectionEnabled(isAllowed),
        analytics().setAnalyticsCollectionEnabled(isAllowed),
      ]);
    }

    const onAgree = () => {
      const isAllowed = true;
      updatePermissions(isAllowed);
      onSubmitHandler({
        variables: { ...formParams, trackAppActivities: isAllowed },
      });
      rest.navigation.goBack();
    };
    const onDecline = () => {
      const isAllowed = false;
      updatePermissions(isAllowed);
      onSubmitHandler({
        variables: { ...formParams, trackAppActivities: isAllowed },
      });
      rest.navigation.goBack();
    };

    const onCreateAccount = () => {
      showModal({
        type: 'info',
        modalType: 'modal',
        title: 'Consent',
        subtitle:
          'We would like to track your activities on the app and document app crash scenarios. This allows us to further improve the app for our users. For more information on data processing and the service providers we use, please see the privacy policy. \n\nYou can revoke your consent at any time in the app settings.',
        actionText: 'Agree',
        onActionPress: onAgree,
        cancelText: 'Decline',
        onCancelPress: onDecline,
        renderFooter: ConsentFooter,
      });
    };

    return (
      <WrappedComponent
        {...rest}
        onCreateAccount={onCreateAccount}
        getFormParam={getFormParam}
        setFormParam={setFormParam}
        values={values}
        setValue={setValue}
        errors={errors}
        setError={setError}
        clearError={clearError}
      />
    );
  };
};
