import React from 'react';

import { StyledFastImage } from './styles';

const propTypes = {};

const defaultProps = {};

function Avatar({ navigation, url }) {
  return <StyledFastImage url={url} />;
}

Avatar.defaultProps = defaultProps;
Avatar.propTypes = propTypes;
export default Avatar;
