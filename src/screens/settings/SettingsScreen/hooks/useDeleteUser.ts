import { useApolloClient } from '@apollo/client';
import { pipe } from 'ramda';

import { isLoggedInVar } from 'api/client/cache';
import useDeleteUserMutation, {
  DELETE_USER_MUTATION_NAME,
} from 'hooks/api/useDeleteUserMutation';
import useNotification from 'hooks/useNotification';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';
import { useStatusNavigation } from 'utils/me';
import Storage from 'utils/storage';

export default function useDeleteUser({ ...options }) {
  const showModal = useNotification({ isAuth: false });
  const [_, navigateTo] = useStatusNavigation();
  const client = useApolloClient();

  const cleanUpUserData = async (message) => {
    navigateTo.welcome();
    // TODO: Log user out before deleting or add cleanup user function for both logout and delete
    await Storage.clearStorage(); // removes all asyncStorage values
    await client.clearStore(); // clear store and don't refetch active queries (For some reason this seems to fetch queries anyway)
    // await client.resetStore(); // // clear store and refetch all active queries
    // client.cache.gc(); // garbage collect cache
    // client.cache.reset().then(() => {}); //reset cache
    isLoggedInVar(false);
  };

  const [deleteUser, deleteUserRes] = useDeleteUserMutation({
    onError: pipe(prettyGraphQLErrors, runAfterInteractionHOF(showModal)),
    onCompleted: runAfterInteractionHOF((data) => {
      data[DELETE_USER_MUTATION_NAME]?.success
        ? showModal({
            type: 'success',
            modalType: 'modal',
            onActionPress: cleanUpUserData,
            onOverlayPress: cleanUpUserData,
            title: data[DELETE_USER_MUTATION_NAME]?.message,
          })
        : null;
    }),
    ...options,
  });

  return [deleteUser, deleteUserRes];
}
