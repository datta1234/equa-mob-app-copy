import React from 'react';

import { map, pipe } from 'ramda';
// import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Typography, Description } from 'components';
import ProjectCards, {
  DefaultActionIcon as ProjectDefaultActionIcon,
} from 'components/ProjectCards';
import {
  ACCOUNT_SETUP_NAVIGATOR,
  APP_NAVIGATOR,
  ROOT_NAVIGATOR,
} from 'constants/routes';
import { getInOr } from 'utils/ramda';
import translator from 'utils/translator';

import withLayout from '../hocs/withLayout';
import withNavigationButtonGroup from '../hocs/withNavigationButtonGroup';
import withStepIndicator from '../hocs/withStepIndicator';
import withThemeProvider from '../hocs/withThemeProvider';
import CardbonCreditStock from '../shared/CardbonCreditStock';
// import ProjectCards from '../shared/ProjectCards';
import {
  ScreenContainer,
  SecondaryWrapper,
  ContentWrapper,
  ContentItemWrapper,
  ContentRowWrapper,
} from '../styles';

import { withMutation, withQuery } from './hocs';

const propTypes = {};

const defaultProps = {};

function ConfirmStep({ myProjects, me, navigation }) {
  const partner = getInOr({}, 'offer.partner', me);
  const offer = getInOr({}, 'offer', me);

  const renderProject = (project) => (
    <ProjectCards.Item
      key={project.id}
      isHorizontal
      project={project}
      renderAction={() => <ProjectDefaultActionIcon isSelected />}
    />
  );

  const renderProjects = map(renderProject);

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

  return (
    <ScreenContainer>
      <ContentWrapper>
        <ContentItemWrapper>
          <Typography.Title>
            {translator.translate('setupAccount.steps.confirm.title', {
              firstName: me.firstName,
            })}
          </Typography.Title>
        </ContentItemWrapper>

        <Typography.Text>
          {translator.translate('setupAccount.steps.confirm.subtitle')}
        </Typography.Text>
      </ContentWrapper>

      <ContentWrapper>
        <ContentItemWrapper>
          <CardbonCreditStock imgUri={partner.thumbnailLogo} />
        </ContentItemWrapper>
      </ContentWrapper>

      <ContentWrapper>
        <ContentItemWrapper>
          <Description>
            <Description.Item
              label={translator.translate(
                'setupAccount.steps.confirm.partnerDescription.keys.business'
              )}>
              {partner.businessName}
            </Description.Item>

            <Description.Item
              label={translator.translate(
                'setupAccount.steps.confirm.partnerDescription.keys.code'
              )}>
              {offer.tempCode}
            </Description.Item>

            <Description.Item
              label={translator.translate(
                'setupAccount.steps.confirm.partnerDescription.keys.category'
              )}>
              {partner.businessCategory}
            </Description.Item>

            <Description.Item
              label={translator.translate(
                'setupAccount.steps.confirm.partnerDescription.keys.credits'
              )}>
              {`${me?.carbonOffset} ${translator.translate(
                'setupAccount.C02ecarbonCredits'
              )}`}
            </Description.Item>
          </Description>
        </ContentItemWrapper>

        <Typography.Text>
          {translator.translate(
            'setupAccount.steps.confirm.paymentDescription'
          )}
        </Typography.Text>
      </ContentWrapper>

      <SecondaryWrapper>
        <ContentWrapper>
          <ContentRowWrapper>
            <Typography.Title level={2}>
              {translator.translate(
                'setupAccount.steps.confirm.mySelectedProjects.title'
              )}
            </Typography.Title>

            <TouchableOpacity onPress={navToAccountSetupAssignProjectStep}>
              <Typography.Title level={4}>
                {translator.translate(
                  'setupAccount.steps.confirm.mySelectedProjects.buttons.edit'
                )}
              </Typography.Title>
            </TouchableOpacity>
          </ContentRowWrapper>
        </ContentWrapper>

        <View style={{ paddingHorizontal: 15 }}>
          <ProjectCards>{renderProjects(myProjects)}</ProjectCards>
        </View>
      </SecondaryWrapper>
    </ScreenContainer>
  );
}

ConfirmStep.defaultProps = defaultProps;
ConfirmStep.propTypes = propTypes;
export default pipe(
  withStepIndicator,
  withLayout,
  withNavigationButtonGroup,
  withThemeProvider,

  withQuery,
  withMutation
)(ConfirmStep);
