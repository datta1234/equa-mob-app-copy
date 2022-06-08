import React, { useState, useRef } from 'react';

import layout from 'constants/layout';

import Item from './Item';
import {
  ItemWrapper,
  ComponentContainer,
  CategoryTitle,
  CategoryToolTip,
  ItemsContainer,
  HorizontalScrollContainer,
} from './styles';

const propTypes = {};

const defaultProps = {};

const { screen } = layout;
function CategorySelector({ title, toolTip, titleColor, children }) {
  const [itemCords, setItemCords] = useState([]);
  const scrollRef = useRef(null);
  const numOfChildren = React.Children.count(children);

  const renderChild = (_child, idx) => {
    const scrollToItem = () => {
      const x = itemCords[idx].x - screen.width / 2 + itemCords[idx].width / 2;
      scrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
    };

    const onLayout = (event) => {
      itemCords[idx] = event.nativeEvent.layout;
      setItemCords([...itemCords]);
    };

    return (
      <ItemWrapper
        onLayout={onLayout}
        idx={idx}
        isLast={idx + 1 === numOfChildren}>
        {React.cloneElement(_child, { scrollToItem })}
      </ItemWrapper>
    );
  };

  return (
    <ComponentContainer>
      <CategoryTitle color={titleColor}>{title}</CategoryTitle>
      <HorizontalScrollContainer
        ref={scrollRef}
        keyboardShouldPersistTaps={'handled'}>
        <ItemsContainer>
          {React.Children.map(children, renderChild)}
        </ItemsContainer>
      </HorizontalScrollContainer>
      <CategoryToolTip>{toolTip}</CategoryToolTip>
    </ComponentContainer>
  );
}

CategorySelector.defaultProps = defaultProps;
CategorySelector.propTypes = propTypes;

CategorySelector.Item = Item;
export { Item };
export default CategorySelector;
