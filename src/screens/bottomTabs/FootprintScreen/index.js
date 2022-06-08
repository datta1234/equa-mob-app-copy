import React from 'react';

// import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const propTypes = {};

const defaultProps = {};

function FootprintScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Footprint Screen</Text>
    </View>
  );
}

FootprintScreen.defaultProps = defaultProps;
FootprintScreen.propTypes = propTypes;
export default FootprintScreen;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    padding: 24,
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
