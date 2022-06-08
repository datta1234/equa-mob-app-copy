import React from 'react';

import { pipe } from 'ramda';
// import PropTypes from 'prop-types';

import { Typography } from 'components';
import translator from 'utils/translator';

import withLayout from '../hocs/withLayout';
import withNavigationButtonGroup from '../hocs/withNavigationButtonGroup';
import withStepIndicator from '../hocs/withStepIndicator';
import withThemeProvider from '../hocs/withThemeProvider';
// import ProjectDefaultActionIcon from '../shared/ProjectDefaultActionIcon';
// import ProjectCards from '../shared/ProjectCards';
import OffsetCounter from '../shared/OffsetCounter';
import { ScreenContainer, ContentWrapper, ContentItemWrapper } from '../styles';

import { withConfirmMutation, withQuery } from './hocs';
import IndividualyProjects from './shared/IndividualyProjects';
import RecomendedProjects from './shared/RecomendedProjects';

const propTypes = {};

const defaultProps = {};

function InvestStep({ me }) {
  return (
    <ScreenContainer>
      {/* <StepIndicator current={2} /> */}

      <ContentWrapper>
        <ContentItemWrapper>
          <Typography.Title>
            {translator.translate('setupAccount.steps.invest.title')}
          </Typography.Title>
        </ContentItemWrapper>

        <ContentItemWrapper>
          <OffsetCounter
            value={me?.carbonOffset || 0}
            partner={me?.offer.partner}
          />
        </ContentItemWrapper>

        <ContentItemWrapper>
          <Typography.Text>
            {translator.translate('setupAccount.steps.invest.descriptions1')}
          </Typography.Text>
        </ContentItemWrapper>

        <ContentItemWrapper>
          <Typography.Text>
            {translator.translate('setupAccount.steps.invest.descriptions2')}
          </Typography.Text>
        </ContentItemWrapper>

        <ContentItemWrapper>
          <Typography.Text>
            {translator.translate('setupAccount.steps.invest.descriptions3')}
          </Typography.Text>
        </ContentItemWrapper>
      </ContentWrapper>

      <RecomendedProjects partner={me?.offer.partner} />

      <IndividualyProjects />
    </ScreenContainer>
  );
}

InvestStep.defaultProps = defaultProps;
InvestStep.propTypes = propTypes;
export default pipe(
  withStepIndicator,
  withLayout,
  withNavigationButtonGroup,
  withThemeProvider,
  // withState,
  // withMutation,
  withQuery,
  withConfirmMutation
)(InvestStep);
