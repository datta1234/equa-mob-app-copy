import { gql, useMutation } from '@apollo/client';
import { pipe } from 'ramda';

import useNotification from 'hooks/useNotification';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';

const UPDATE_USER_MUTATION_NAME = 'UpdateUser';
const UPDATE_USER_PERMISSIONS = gql`
  mutation UpdateUserPermissions($trackAnalytics: Boolean, $trackCrashStatistics: Boolean ) {
    ${UPDATE_USER_MUTATION_NAME}(
	input: {
	  trackAnalytics: $trackAnalytics
	  trackCrashStatistics: $trackCrashStatistics
	}) {
      id
      trackAnalytics
      trackCrashStatistics
    }
  }
`;

export default function useUpdateUserPermissions({ ...options }) {
  const showModal = useNotification({ isAuth: false });

  const [updateUserPermissions, { data, ...other }] = useMutation(
    UPDATE_USER_PERMISSIONS,
    {
      onError: pipe(prettyGraphQLErrors, runAfterInteractionHOF(showModal)),
      ...options,
    }
  );

  const updateUserPermissionsResult = {
    data: data?.[UPDATE_USER_MUTATION_NAME],
    ...other,
  };

  return [updateUserPermissions, updateUserPermissionsResult];
}
