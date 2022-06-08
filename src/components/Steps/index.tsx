import React from 'react';

import { StyleSheet, View } from 'react-native';

import { mapIndexed } from 'utils/ramda';

import Step from './Step';

const propTypes = {
  // children: PropTypes.array(PropTypes.node),
};

const defaultProps = {};

function Steps({ children, current }) {
  const renderChild = (child, idx) =>
    React.cloneElement(child, {
      orderNumber: idx + 1,
      isPassed: idx + 1 <= current,
    });
  const renderChilds = mapIndexed(renderChild);

  return <View style={styles.container}>{renderChilds(children)}</View>;
}

Steps.defaultProps = defaultProps;
Steps.propTypes = propTypes;

Steps.Step = Step;
export default Steps;

// styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
