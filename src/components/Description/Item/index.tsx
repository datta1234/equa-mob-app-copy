import React from 'react';

// import { rgba } from 'polished';
// import PropTypes from 'prop-types';

import Typography from 'components/Typography';
// import colors from 'constants/colors';

import { ValueContainer, LabelContainer, Container } from './styles';

const propTypes = {};

const defaultProps = {};

function DescriptionItem({ label, children, mode }) {
  return (
    <Container>
      <LabelContainer>
        <Typography.Text mode={mode} uppercase size="small">
          {label}
        </Typography.Text>
      </LabelContainer>

      <ValueContainer>
        <Typography.Title mode={mode} level={4}>
          {children}
        </Typography.Title>
      </ValueContainer>
    </Container>
  );
}

DescriptionItem.defaultProps = defaultProps;
DescriptionItem.propTypes = propTypes;
export default DescriptionItem;
