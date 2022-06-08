import React from 'react';

// import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

const propTypes = {};

const defaultProps = {};

function Header() {
  return (
    <View>
      <Text>Header</Text>
    </View>
  );
}

Header.defaultProps = defaultProps;
Header.propTypes = propTypes;
export default Header;
