import React from 'react';

// import PropTypes from 'prop-types';

import Typography from 'components/Typography';

import { Container, TitleWrapper, ButtonWrapper } from './styles';

const propTypes = {};

const defaultProps = {};

function Placeholder({ title, subtitle, children }) {
  return (
    <Container>
      <TitleWrapper>
        <Typography.Title level={2} center>
          {title}
        </Typography.Title>
      </TitleWrapper>
      <Typography.Text center>{subtitle}</Typography.Text>

      {children && <ButtonWrapper>{children}</ButtonWrapper>}
    </Container>
  );
}

Placeholder.defaultProps = defaultProps;
Placeholder.propTypes = propTypes;
export default Placeholder;
