import React from 'react';

import { map, pipe } from 'ramda';

import { Typography } from 'components';
import translator from 'utils/translator';

import withLayout from '../hocs/withLayout';
import withNavigationButtonGroup from '../hocs/withNavigationButtonGroup';
import withStepIndicator from '../hocs/withStepIndicator';
import withThemeProvider from '../hocs/withThemeProvider';
// import ProjectCards from '../shared/ProjectCards';
import OffsetCounter from '../shared/OffsetCounter';
import { ScreenContainer, ContentWrapper, ContentItemWrapper } from '../styles';

import { withMutation, withQuery, withState } from './hocs';
import SelectedProjects from './shared/SelectedProjects';

const propTypes = {};

const defaultProps = {};

function InvestStep({ data, onChangeSlider, slidersValues, me }) {
  return (
    <ScreenContainer>
      {/* <StepIndicator current={2} /> */}

      <ContentWrapper>
        <ContentItemWrapper>
          <Typography.Title>
            {translator.translate('setupAccount.steps.assign.title')}
          </Typography.Title>
        </ContentItemWrapper>

        <ContentItemWrapper>
          <OffsetCounter
            value={me?.carbonOffset || 0}
            interactive
            partner={me?.offer.partner}
          />
        </ContentItemWrapper>

        <ContentItemWrapper>
          <Typography.Text>
            {translator.translate('setupAccount.steps.assign.description1')}
          </Typography.Text>
        </ContentItemWrapper>

        <ContentItemWrapper>
          <Typography.Text>
            {translator.translate('setupAccount.steps.assign.description2')}
          </Typography.Text>
        </ContentItemWrapper>

        <ContentItemWrapper>
          <Typography.Text>
            {translator.translate('setupAccount.steps.assign.description3')}
          </Typography.Text>
        </ContentItemWrapper>
      </ContentWrapper>

      <SelectedProjects
        data={data}
        onChangeSlider={onChangeSlider}
        slidersValues={slidersValues}
      />
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

  withState,
  withQuery,
  withMutation
)(InvestStep);
