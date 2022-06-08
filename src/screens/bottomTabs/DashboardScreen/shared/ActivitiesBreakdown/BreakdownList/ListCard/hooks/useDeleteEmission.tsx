import React from 'react';

import { useNavigation } from '@react-navigation/native';

import Button from 'components/Button';
import useDeleteEmissionMutation, {
  DUE_MUTATION_NAME,
} from 'hooks/api/useDeleteUserEmissionMutation';
import useNotification from 'hooks/useNotification';
import { runAfterInteractionHOF } from 'utils/helpers';

const DeleteEmissionAction = ({ id, options }) => {
  const showModal = useNotification({ isAuth: false });
  const navigation = useNavigation();

  const showSuccess = ({ type, message, title }) =>
    showModal({
      title: title ?? 'Success',
      subtitle: message,
      type: type || 'success',
      showAction: false,
      showCancel: false,
    });
  const showFailure = ({ type, message, title }) =>
    showModal({
      title: title ?? 'Failure',
      subtitle: message,
      type: type || 'failure',
      showAction: false,
      showCancel: false,
    });

  const [deleteUserEmission, deleteUserEmissionRes] = useDeleteEmissionMutation(
    {
      onCompleted: runAfterInteractionHOF((data) => {
        navigation.goBack(); // goBack from are you sure delete modal
        const { success, ...modalProps } = data?.[DUE_MUTATION_NAME];
        success ? showSuccess(modalProps) : showFailure(modalProps);
      }),
      onError: runAfterInteractionHOF((errors) => {
        navigation.goBack(); // goBack from are you sure delete modal
        showModal({ errors });
      }),
      ...options,
    }
  );
  const { loading } = deleteUserEmissionRes;

  return (
    <Button
      isLoading={loading}
      onPressHandler={() => {
        deleteUserEmission({ variables: { id: id } });
      }}>
      Delete
    </Button>
  );
};

export default function useDeleteEmission({ ...options }) {
  const showModal = useNotification({ isAuth: false });

  function onDeleteUserEmission(id) {
    showModal({
      type: 'warning',
      title: 'Are you sure you want to delete this activity emission?',
      renderNode: () => <DeleteEmissionAction id={id} options={options} />,
      cancel: true,
    });
  }

  return onDeleteUserEmission;
}
