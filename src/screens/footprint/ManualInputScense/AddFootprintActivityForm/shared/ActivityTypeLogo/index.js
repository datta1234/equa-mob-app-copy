import React from 'react';

// import PropTypes from 'prop-types';
// import footprintTravelLogo from 'assets/add_activity/footprint_activity/travel.svg';
import FastImage from 'react-native-fast-image';

import { Container } from './styles';

const propTypes = {};

const defaultProps = {};

function ActivityTypeLogo({ logoUrl }) {
  return (
    <Container>
      {/* <LocalSvg asset={footprintFoodLogo} width={30} height={30} /> */}
      <FastImage
        style={{ width: 35, height: 35 }}
        source={{
          uri: logoUrl,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />

      {/* <Image
        source={{
          uri: logoUrl,
        }}
        style={{ width: 35, height: 35 }}
      /> */}
    </Container>
  );
}

ActivityTypeLogo.defaultProps = defaultProps;
ActivityTypeLogo.propTypes = propTypes;
export default ActivityTypeLogo;
