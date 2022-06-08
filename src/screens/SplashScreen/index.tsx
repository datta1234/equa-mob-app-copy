import React from 'react';

// import PropTypes from 'prop-types';

import { Spinner } from 'components';
import { BaseStackNavigationProp, BaseStackRouteProp } from 'types/navigation';

import { withQuery } from './hocs';
import { Container } from './styles';

type Props = {
  route: BaseStackRouteProp<'SplashScreen'>;
  navigation: BaseStackNavigationProp<'SplashScreen'>;
};

const defaultProps = {};

function SplashScreen({}: Props) {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

SplashScreen.defaultProps = defaultProps;
export default withQuery(SplashScreen);
