import React from 'react';

import BadgeItem from './Item';
import { Container, ItemWrapper } from './styles';

const propTypes = {};

const defaultProps = {};

function Badges({ children }) {
  const numberofChilds = React.Children.count(children);
  const renderChild = (_child, idx) => (
    <ItemWrapper isLast={idx + 1 == numberofChilds} isFirst={idx == 0}>
      {React.cloneElement(_child)}
    </ItemWrapper>
  );

  return <Container>{React.Children.map(children, renderChild)}</Container>;
}

Badges.defaultProps = defaultProps;
Badges.propTypes = propTypes;

Badges.Item = BadgeItem;
export default Badges;
