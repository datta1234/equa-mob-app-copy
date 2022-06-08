import React from 'react';

import { length, map } from 'ramda';

import { mapIndexed } from 'utils/ramda';
import translator from 'utils/translator';

// import PropTypes from 'prop-types';

import {
  Container,
  Bar,
  BarTitleContainer,
  BarTitle,
  ProgressFragmentContainer,
} from './styles';

const propTypes = {};

const defaultProps = {};

function SetupIndicator() {
  const OPTIONS = [
    {
      key: 0,
      title: translator.translate(
        'profileScreen.finishAccountSetup.steps.redeemCredit'
      ),
      isActive: true,
    },
    {
      key: 1,
      title: translator.translate(
        'profileScreen.finishAccountSetup.steps.createPortfolio'
      ),
      isActive: true,
    },
    {
      key: 2,
      title: translator.translate(
        'profileScreen.finishAccountSetup.steps.calculateFootprint'
      ),
      isActive: false,
    },
    {
      key: 3,
      title: translator.translate(
        'profileScreen.finishAccountSetup.steps.setYourGoal'
      ),
      isActive: false,
    },
    {
      key: 4,
      title: translator.translate(
        'profileScreen.finishAccountSetup.steps.joinGroup'
      ),
      isActive: false,
    },
  ];

  const ProgressFragment = ({ title, isActive, ...rest }) => {
    return (
      <ProgressFragmentContainer>
        <Bar isActive={isActive} {...rest} />
        <BarTitleContainer>
          <BarTitle isActive={isActive}>{title}</BarTitle>
        </BarTitleContainer>
      </ProgressFragmentContainer>
    );
  };

  const renderProgressFragments = (opts) => {
    return mapIndexed(
      (optionsForItem, idx) => (
        <ProgressFragment
          {...optionsForItem}
          isLast={idx + 1 == length(opts)}
          isFirst={idx === 0}
        />
      ),
      opts
    );
  };

  return <Container>{renderProgressFragments(OPTIONS)}</Container>;
}

SetupIndicator.defaultProps = defaultProps;
SetupIndicator.propTypes = propTypes;
export default SetupIndicator;
