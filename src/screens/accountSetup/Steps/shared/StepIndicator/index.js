import React from 'react';

import PropTypes from 'prop-types';
import { map } from 'ramda';

import Steps from 'components/Steps';
import translator from 'utils/translator';

const propTypes = {
  current: PropTypes.number,
};

const defaultProps = {
  current: 1,
};

function StepIndicator({ current }) {
  const STEPS = [
    {
      key: 0,
      title: translator.translate('setupAccount.steps.register.name'),
    },
    {
      key: 1,
      title: translator.translate('setupAccount.steps.invest.name'),
    },
    {
      key: 2,
      title: translator.translate('setupAccount.steps.assign.name'),
    },
    {
      key: 3,
      title: translator.translate('setupAccount.steps.confirm.name'),
    },
  ];

  const renderStep = (props) => <Steps.Step {...props} />;
  const renderSteps = map(renderStep);

  return <Steps current={current}>{renderSteps(STEPS)}</Steps>;
}

StepIndicator.defaultProps = defaultProps;
StepIndicator.propTypes = propTypes;
export default StepIndicator;
