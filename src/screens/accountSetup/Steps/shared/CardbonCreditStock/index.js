import React from 'react';

// import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

// import Typography from 'components/Typography';

import {
  Container,
  CheckIconContainer,
  Checkicon,
  ImageContainer,
} from './styles';

const propTypes = {};

const defaultProps = {};

function CardbonCreditStock({ imgUri }) {
  // const [isLoaded, setLoaded] = useState(false);

  return (
    <Container>
      <View>
        <CheckIconContainer>
          <Checkicon />
        </CheckIconContainer>

        <ImageContainer>
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={{
              uri: imgUri,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </ImageContainer>
      </View>
    </Container>
  );
}

CardbonCreditStock.defaultProps = defaultProps;
CardbonCreditStock.propTypes = propTypes;
export default CardbonCreditStock;
