import { gql, useMutation } from '@apollo/client';

export const DELETE_USER_MUTATION_NAME = 'DeleteUser';
const DELETE_USER = gql`
  mutation DeleteUser{
    ${DELETE_USER_MUTATION_NAME}
     {
      success
      errors
      message
    }
  }
`;

export default function useDeleteUserMutation({ ...options }) {
  const [deleteUser, deleteUserRes] = useMutation(DELETE_USER, {
    ...options,
  });

  return [deleteUser, deleteUserRes];
}
