import React from 'react';

import styled from 'styled-components/native';

import { Text } from 'components/Typography';

import useDeleteEmission from '../hooks/useDeleteEmission';

export const TouchableContainer = styled.TouchableOpacity`
  background-color: ${({ theme, mode = 'light' }) =>
    theme[mode].background.warning};
  padding-horizontal: 10px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

const DeleteButton = ({ activityId, hideButton }) => {
  const deleteActivity = useDeleteEmission();

  function onDeletePress() {
    hideButton();
    deleteActivity(activityId);
  }

  return (
    <TouchableContainer onPress={onDeletePress}>
      <Text color={'light'} bold fontSize={'h7'}>
        Delete
      </Text>
    </TouchableContainer>
  );
};

export default DeleteButton;
