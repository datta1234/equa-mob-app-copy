import React from 'react';

// import PropTypes from 'prop-types';

import { Typography } from 'components';

const propTypes = {};

const defaultProps = {};

import { Container, IconContainer } from './styles';

function CardDescriptionItem({ renderIcon, children }) {
  return (
    <Container>
      <IconContainer>{renderIcon()}</IconContainer>
      <Typography.Text size="small">{children}</Typography.Text>
    </Container>
  );
}

CardDescriptionItem.defaultProps = defaultProps;
CardDescriptionItem.propTypes = propTypes;
export default CardDescriptionItem;
