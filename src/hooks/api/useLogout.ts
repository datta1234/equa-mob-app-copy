import { useApolloClient, useQuery } from '@apollo/client';

import { isLoggedInVar } from 'api/client/cache';
import { IS_LOGGED_IN } from 'api/operations/queries/getIsLoggedIn';
import useLogoutLazyQuery, {
  LOGOUT_QUERY_NAME,
} from 'hooks/api/useLogoutLazyQuery';
import useNotification from 'hooks/useNotification';
import authService from 'utils/auth';
import { runAfterInteractionHOF } from 'utils/helpers';
import { useStatusNavigation } from 'utils/me';

function useLogout() {
  const [_, navigateTo, navigation] = useStatusNavigation();
  const showModal = useNotification();
  const client = useApolloClient();
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);

  const cleanUp = async () => {
    // client.cache.evict({ fieldName: 'User' });
    // await client.cache.gc();
    // await client.cache.reset();
    await authService.removeTokens();
    await client.clearStore(); // clear store and don't refetch active queries ( TODO: fix - seems to refetch anyway)
    // await client.resetStore(); // // clear store and refetch all active queries
    //await authService.reset();
    isLoggedInVar(false);
    navigateTo.welcome();
  };

  const [logoutQuery, queryResponseObject] = useLogoutLazyQuery({
    onCompleted: runAfterInteractionHOF((data) => {
      data[LOGOUT_QUERY_NAME].success ? cleanUp() : null;
    }),
    onError: runAfterInteractionHOF((errors) => {
      navigation.goBack(); // goBack from are you sure delete modal
      showModal({ errors });
    }),
  });

  const logout = async () => {
    const refreshToken = await authService.getRefreshToken();
    logoutQuery({ variables: { refreshToken } });
  };

  return [logout, queryResponseObject, isLoggedIn];
}

export default useLogout;
