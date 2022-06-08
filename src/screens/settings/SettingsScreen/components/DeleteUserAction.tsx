import React from 'react';

import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { Button } from 'components';
import { ClickableText } from 'components/Typography';
import { scaleHeight } from 'constants/layout';
import useNotification from 'hooks/useNotification';

import useDeleteUser from '../hooks/useDeleteUser';

const ButtonContainer = styled.View`
  min-width: 200px;
  margin-top: ${scaleHeight(20) + 'px'};
`;

const DeleteButton = styled(Button).attrs({
  title: 'Yes, Delete',
  color: 'warning',
})``;

const CancelButton = styled(Button).attrs({
  title: 'No, Cancel',
  textColor: 'primary',
  isOutline: true,
})`
  margin-top: ${scaleHeight(20) + 'px'};
  margin-bottom: ${scaleHeight(40) + 'px'};
`;

export const DeleteAccountButton = styled(ClickableText).attrs({
  text: 'Delete my account',
  color: 'error',
  make: ['underline'],
  fontSize: 'h6',
})``;

const DeleteActions = () => {
  const navigation = useNavigation();

  const [deleteUserReq, { loading }] = useDeleteUser({});

  return (
    <ButtonContainer>
      <DeleteButton isLoading={loading} onPressHandler={deleteUserReq} />
      <CancelButton onPressHandler={navigation.goBack} />
    </ButtonContainer>
  );
};

const DeleteUserAction = () => {
  const showModal = useNotification();

  const showResetInstructions = () => {
    showModal({
      modalType: 'drawer',
      type: 'warning',
      title: 'Your account will be deleted.',
      subtitle:
        'Your information and data will be removed from our database permanently',
      renderNode: DeleteActions,
    });
  };

  return <DeleteAccountButton onPress={showResetInstructions} />;
};

export default DeleteUserAction;
