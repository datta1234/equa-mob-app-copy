import React from 'react';

import { Title, Text } from 'components/Typography';

import { InfoBoxContainer, ListContainer, ListItemContainer } from './styles';

const InfoBox = ({ listBox }) => {
  if (listBox?.type !== 'DISPLAY_LIST_BOX') {
    return null;
  }
  return (
    <InfoBoxContainer>
      {listBox.title && (
        <Title bold color={'primary'} level={4}>
          {listBox.title}
        </Title>
      )}
      <ListContainer>
        {listBox.data.map((subItem) => (
          <ListItemContainer key={subItem.order}>
            <Text color={'secondary'} fontSize={'h6'}>
              {'\u2022  '}
            </Text>
            <Text color={'secondary'} fontSize={'h6'}>
              {subItem.title}
            </Text>
          </ListItemContainer>
        ))}
      </ListContainer>
    </InfoBoxContainer>
  );
};

export default InfoBox;
