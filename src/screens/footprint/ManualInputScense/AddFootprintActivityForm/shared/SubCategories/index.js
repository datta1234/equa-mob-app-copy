import React from 'react';

// import PropTypes from 'prop-types';

import Item from './Item';
import { ItemWrapper, Container, HorizontalScrollContainer } from './styles';

const propTypes = {};

const defaultProps = {};

function SubCategories({ children }) {
  const numberofChilds = React.Children.count(children);
  const renderChild = (_child, idx) => (
    <ItemWrapper isLast={idx + 1 == numberofChilds}>
      {React.cloneElement(_child)}
    </ItemWrapper>
  );

  return (
    <HorizontalScrollContainer>
      <Container>{React.Children.map(children, renderChild)}</Container>
    </HorizontalScrollContainer>
  );
}

SubCategories.defaultProps = defaultProps;
SubCategories.propTypes = propTypes;

SubCategories.Item = Item;
export default SubCategories;
