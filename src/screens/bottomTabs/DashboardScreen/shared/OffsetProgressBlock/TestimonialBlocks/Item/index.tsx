import React from 'react';
import { Fragment } from 'react';

// import PropTypes from 'prop-types';

import { carbonOffsetFormat } from 'utils/formats';

import {
  Container,
  ValueText,
  ModuleText,
  DescriptionText,
  TargetValueContainer,
  PostfixContainer,
} from './styles';

const propTypes = {};

const defaultProps = {};

function TestimonialBlockItem({ value, module, description, renderPostfix }) {
  return (
    <Fragment>
      <Container>
        <TargetValueContainer>
          <ValueText>{carbonOffsetFormat(value, { exp: 1 })}</ValueText>
          <ModuleText>{module}</ModuleText>
        </TargetValueContainer>

        <DescriptionText>{description}</DescriptionText>
      </Container>
      {renderPostfix && <PostfixContainer>{renderPostfix()}</PostfixContainer>}
    </Fragment>
  );
}

TestimonialBlockItem.defaultProps = defaultProps;
TestimonialBlockItem.propTypes = propTypes;
export default TestimonialBlockItem;
