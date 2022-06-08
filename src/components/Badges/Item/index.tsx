import React from 'react';

// import PropTypes from 'prop-types';

import { Container, Title } from './styles';

const propTypes = {};

const defaultProps = {};

function BadgeItem({ children, isActive }) {
  return (
    <Container isActive={isActive}>
      <Title isActive={isActive}>{children}</Title>
    </Container>
  );
}

BadgeItem.defaultProps = defaultProps;
BadgeItem.propTypes = propTypes;
export default BadgeItem;
