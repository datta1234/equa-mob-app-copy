import React from 'react';

// import PropTypes from 'prop-types';

import Item from './Item';
import { Container, ItemWrapper } from './styles';

const propTypes = {};

const defaultProps = {};

function List({ children }) {
  const numberofChilds = React.Children.count(children);
  const renderChild = (_child, idx) => (
    <ItemWrapper isLast={idx + 1 == numberofChilds}>
      {React.cloneElement(_child)}
    </ItemWrapper>
  );

  return <Container>{React.Children.map(children, renderChild)}</Container>;
}

List.defaultProps = defaultProps;
List.propTypes = propTypes;
List.Item = Item;
export default List;
