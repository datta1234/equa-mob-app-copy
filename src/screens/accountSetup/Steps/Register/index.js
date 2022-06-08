import React, { useEffect, useState } from 'react';

import { pipe } from 'ramda';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Input } from 'react-native-elements';

import { Typography, Description } from 'components';
import { getSmartCounterStream } from 'utils/common';
import { carbonOffsetFormat } from 'utils/formats';
import { isNotDefined, getIn, getInOr, isDefined } from 'utils/ramda';
import translator from 'utils/translator';

import withLayout from '../hocs/withLayout';
import withNavigationButtonGroup from '../hocs/withNavigationButtonGroup';
import withStepIndicator from '../hocs/withStepIndicator';
import withThemeProvider from '../hocs/withThemeProvider';
import CardbonCreditStock from '../shared/CardbonCreditStock';
import {
  ScreenContainer,
  SecondaryWrapper,
  ContentWrapper,
  ContentItemWrapper,
} from '../styles';

import { FIELDS } from './constants';
import { withQuery, withState, withMutation } from './hocs';
const propTypes = {};

const defaultProps = {};

function RegisterStep({ me, getFormParam, setFormParam }) {
  const offer = getIn('offer', me);
  const firstName = getInOr('Guest', 'firstName', me);
  const partner = getIn('offer.partner', me);

  const [_val, _setVal] = useState(0);

  useEffect(() => {
    if (isDefined(me)) {
      const $smartCounterStream = getSmartCounterStream({
        initial: me.carbonOffset,
        value: _val,
        animateTimeMs: 5000,
      });

      const subscription = $smartCounterStream.subscribe(_setVal);

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [me?.carbonOffset]);

  if (isNotDefined(me)) {
    return null;
  }

  return (
    <ScreenContainer>
      <ContentWrapper>
        <ContentItemWrapper>
          <Typography.Title>{`${translator.translate(
            'setupAccount.steps.register.welcome',
          )}, ${firstName}`}</Typography.Title>
        </ContentItemWrapper>

        <Typography.Text>
          {translator.translate('setupAccount.steps.register.descriptions')}
        </Typography.Text>

        <ContentWrapper>
          <ContentItemWrapper>
            <CardbonCreditStock imgUri={partner.thumbnailLogo} />
          </ContentItemWrapper>
        </ContentWrapper>

        <ContentItemWrapper>
          <Description>
            <Description.Item
              label={translator.translate(
                'setupAccount.steps.register.partnerDescription.keys.business',
              )}>
              {partner.businessName}
            </Description.Item>

            <Description.Item
              label={translator.translate(
                'setupAccount.steps.register.partnerDescription.keys.code',
              )}>
              {offer.tempCode}
            </Description.Item>

            <Description.Item
              label={translator.translate(
                'setupAccount.steps.register.partnerDescription.keys.category',
              )}>
              {partner.businessCategory}
            </Description.Item>

            <Description.Item
              label={translator.translate(
                'setupAccount.steps.register.partnerDescription.keys.credits',
              )}>
              {`${carbonOffsetFormat(_val)} ${translator.translate(
                'setupAccount.C02ecarbonCredits',
              )}`}
            </Description.Item>
          </Description>
        </ContentItemWrapper>

        <Typography.Text>
          {translator.translate(
            'setupAccount.steps.register.paymentDescriptions',
          )}
        </Typography.Text>
      </ContentWrapper>

      <SecondaryWrapper>
        <ContentItemWrapper withHorizontal>
          <Typography.Title level={3}>
            {translator.translate(
              'setupAccount.steps.register.createAccount.name',
            )}
          </Typography.Title>
        </ContentItemWrapper>
      </SecondaryWrapper>

      <ContentWrapper>
        <ContentItemWrapper>
          <View style={{ flexDirection: 'row', flex: 1, width: '100%' }}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Input
                placeholder={translator.translate(
                  'setupAccount.steps.register.createAccount.fields.firstName.placeholder',
                )}
                label={translator.translate(
                  'setupAccount.steps.register.createAccount.fields.firstName.label',
                )}
                value={getFormParam(FIELDS.FIRST_NAME.NAME)}
                onChangeText={setFormParam(FIELDS.FIRST_NAME.NAME)}
              />
            </View>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Input
                placeholder={translator.translate(
                  'setupAccount.steps.register.createAccount.fields.lastName.placeholder',
                )}
                label={translator.translate(
                  'setupAccount.steps.register.createAccount.fields.lastName.label',
                )}
                value={getFormParam(FIELDS.LAST_NAME.NAME)}
                onChangeText={setFormParam(FIELDS.LAST_NAME.NAME)}
              />
            </View>
          </View>

          <Input
            placeholder={translator.translate(
              'setupAccount.steps.register.createAccount.fields.location.placeholder',
            )}
            label={translator.translate(
              'setupAccount.steps.register.createAccount.fields.location.label',
            )}
            value={getFormParam(FIELDS.LOCATION.NAME)}
            onChangeText={setFormParam(FIELDS.LOCATION.NAME)}
          />

          <Input
            placeholder={translator.translate(
              'setupAccount.steps.register.createAccount.fields.mobileNumber.placeholder',
            )}
            label={translator.translate(
              'setupAccount.steps.register.createAccount.fields.mobileNumber.label',
            )}
            value={me.mobileNumber}
            disabled
          />

          <Input
            placeholder={translator.translate(
              'setupAccount.steps.register.createAccount.fields.email.placeholder',
            )}
            label={translator.translate(
              'setupAccount.steps.register.createAccount.fields.email.label',
            )}
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            value={getFormParam(FIELDS.EMAIL.NAME)}
            onChangeText={setFormParam(FIELDS.EMAIL.NAME)}
          />

          <Input
            placeholder={translator.translate(
              'setupAccount.steps.register.createAccount.fields.password.placeholder',
            )}
            label={translator.translate(
              'setupAccount.steps.register.createAccount.fields.password.label',
            )}
            secureTextEntry
            value={getFormParam(FIELDS.PASSWORD.NAME)}
            onChangeText={setFormParam(FIELDS.PASSWORD.NAME)}
            // eye
          />

          <Input
            placeholder={translator.translate(
              'setupAccount.steps.register.createAccount.fields.reEnterPassword.placeholder',
            )}
            label={translator.translate(
              'setupAccount.steps.register.createAccount.fields.reEnterPassword.label',
            )}
            secureTextEntry
            value={getFormParam(FIELDS.PASSWORD_CONFIRMATION.NAME)}
            onChangeText={setFormParam(FIELDS.PASSWORD_CONFIRMATION.NAME)}
            // eye
          />
        </ContentItemWrapper>
      </ContentWrapper>

      <SecondaryWrapper>
        <ContentItemWrapper withHorizontal>
          <Typography.Title level={3}>
            {translator.translate(
              'setupAccount.steps.register.paymentInformation.name',
            )}
          </Typography.Title>
        </ContentItemWrapper>
      </SecondaryWrapper>

      <ContentWrapper>
        <ContentItemWrapper>
          <Typography.Text>
            {translator.translate(
              'setupAccount.steps.register.paymentInformation.description',
            )}
          </Typography.Text>
        </ContentItemWrapper>

        <ContentItemWrapper>
          <Input
            placeholder={translator.translate(
              'setupAccount.steps.register.paymentInformation.fields.name.placeholder',
            )}
            label={translator.translate(
              'setupAccount.steps.register.paymentInformation.fields.name.label',
            )}
            value="Alexander Herzberg"
          />

          <Input
            placeholder={translator.translate(
              'setupAccount.steps.register.paymentInformation.fields.creditCardNumber.placeholder',
            )}
            label={translator.translate(
              'setupAccount.steps.register.paymentInformation.fields.creditCardNumber.label',
            )}
            value="1234 5678 9012 1234"
          />

          <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Input
                placeholder={translator.translate(
                  'setupAccount.steps.register.paymentInformation.fields.creditCardExpiration.placeholder',
                )}
                label={translator.translate(
                  'setupAccount.steps.register.paymentInformation.fields.creditCardExpiration.label',
                )}
                value="10 / 25"
              />
            </View>

            <View style={{ flex: 1, marginLeft: 5 }}>
              <Input
                placeholder={translator.translate(
                  'setupAccount.steps.register.paymentInformation.fields.creditCardCVV.placeholder',
                )}
                label={translator.translate(
                  'setupAccount.steps.register.paymentInformation.fields.creditCardCVV.label',
                )}
                value="123"
                secureTextEntry
              />
            </View>
          </View>
        </ContentItemWrapper>
      </ContentWrapper>
    </ScreenContainer>
  );
}

RegisterStep.defaultProps = defaultProps;
RegisterStep.propTypes = propTypes;
export default pipe(
  withStepIndicator,
  withLayout,
  withNavigationButtonGroup,
  withMutation,
  withQuery,
  withState,
  withThemeProvider,
)(RegisterStep);
