import React from 'react';

// import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import AutoScrolling from 'react-native-auto-scrolling';

import PreviewItem from './PreviewItem';
import { Container, ItemWrapper } from './styles';
const propTypes = {};

const defaultProps = {};

function PreviewList({ children }) {
  const numberofChilds = React.Children.count(children);
  const renderChild = (_child, idx) => (
    <ItemWrapper isLast={idx + 1 == numberofChilds}>
      {React.cloneElement(_child)}
    </ItemWrapper>
  );

  return (
    <AutoScrolling>
      <Container>{React.Children.map(children, renderChild)}</Container>
    </AutoScrolling>
  );
}

PreviewList.defaultProps = defaultProps;
PreviewList.propTypes = propTypes;
PreviewList.Item = PreviewItem;
export default PreviewList;
