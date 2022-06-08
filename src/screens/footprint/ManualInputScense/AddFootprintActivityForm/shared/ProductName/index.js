import React from 'react';

// import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import { Container, ProductNameText } from './styles';

const propTypes = {};

const defaultProps = {};

function ProductName({ name }) {
  return (
    <Container>
      <ProductNameText>
        {/* {'Cucina & Amore Farro Emmer & Spelt Pouch'} */}
        {name}
      </ProductNameText>
    </Container>
  );
}

ProductName.defaultProps = defaultProps;
ProductName.propTypes = propTypes;
export default ProductName;
