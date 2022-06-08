import React from 'react';

import { rgba } from 'polished';
import { join } from 'ramda';
// import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import Typography from 'components/Typography';
import colors from 'constants/colors';

const propTypes = {};

const defaultProps = {};

function Step({ isPassed, title, orderNumber }) {
  return (
    <View style={styles.container}>
      <Typography.Text
        size="small"
        style={[styles.title, isPassed && styles.activeTitle]}>
        {join('. ', [orderNumber, title])}
      </Typography.Text>

      <View style={[styles.bar, isPassed && styles.activeBar]} />
    </View>
  );
}

Step.defaultProps = defaultProps;
Step.propTypes = propTypes;
export default Step;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bar: {
    width: '100%',
    height: 4,
    backgroundColor: rgba(colors.GRAY2, 0.5),
  },
  activeBar: {
    backgroundColor: colors.DARK_ACCENT,
  },

  title: {
    opacity: 1,
    paddingVertical: 10,
    fontSize: 12,
  },
  activeTitle: {
    color: colors.DARK_ACCENT,
  },
});
