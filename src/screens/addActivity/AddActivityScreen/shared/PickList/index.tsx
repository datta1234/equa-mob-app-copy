import React from 'react';

import { TouchableOpacity } from 'react-native';

import CategorySelector from '../CategorySelector';

const PickListItem = ({ item, scrollToItem, onPress }) => {
  const onItemPress = () => {
    scrollToItem();
    onPress();
  };
  return (
    <TouchableOpacity onPress={onItemPress} disabled={!item?.active}>
      <CategorySelector.Item
        isActive={item?.active}
        isSelected={item?.selected}>
        {item?.title}
      </CategorySelector.Item>
    </TouchableOpacity>
  );
};

const PickList = ({ list, level, onPress }) => {
  if (list?.type !== 'PICK_LIST') {
    return null;
  }

  const selectedItemToolTip = list?.data?.find((item) => item.selected === true)
    ?.toolTip?.title;
  return (
    <CategorySelector title={list?.title} toolTip={selectedItemToolTip}>
      {list?.data?.map((item) => (
        <PickListItem
          key={item?.code}
          item={item}
          onPress={() => onPress(item, level)}
        />
      ))}
    </CategorySelector>
  );
};

export default PickList;
