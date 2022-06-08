import React from 'react';

import { rgba } from 'polished';
import PropTypes from 'prop-types';
import { length } from 'ramda';
import { StyleSheet, View } from 'react-native';

import colors from 'constants/colors';

import Item from './Item';
import { ItemWrapper, Container } from './styles';

const propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']),
};

const defaultProps = {
  mode: 'light',
};

function Description({ children, mode }) {
  const numberofChilds = length(React.Children.toArray(children));
  const renderChild = (_child, idx) => (
    <ItemWrapper mode={mode} isLast={idx + 1 == numberofChilds}>
      {React.cloneElement(_child, { mode })}
    </ItemWrapper>
  );

  return (
    <View style={styles.container}>
      {React.Children.map(children, renderChild)}
    </View>
  );
}

Description.defaultProps = defaultProps;
Description.propTypes = propTypes;
Description.Item = Item;
export { Item };
export default Description;

// styles
const styles = StyleSheet.create({
  container: {},
  childWrapper: {
    borderBottomWidth: 1,
    borderColor: rgba(colors.GRAY2, 0.25),
  },
});
