import React from 'react';

// import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import Item from './Item';
import { ItemContainer, Container } from './styles';

const propTypes = {};

const defaultProps = {};

function TestimonialBlock({ children }) {
  return (
    <Container>
      {React.Children.map(children, (_child, idx) => {
        return <ItemContainer>{_child}</ItemContainer>;
      })}
    </Container>
  );
}

TestimonialBlock.defaultProps = defaultProps;
TestimonialBlock.propTypes = propTypes;
TestimonialBlock.Item = Item;
export default TestimonialBlock;
