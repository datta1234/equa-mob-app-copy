import { gql, useQuery } from '@apollo/client';
import { pipe } from 'ramda';

import useNotification from 'hooks/useNotification';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';

const GET_USER_QUERY_NAME = 'GetUser';
const GET_USER_PERMISSIONS = gql`
  query GetUser {
    ${GET_USER_QUERY_NAME} {
      id,
      trackAnalytics,
      trackCrashStatistics,
    }
  }
`;

export default function useGetUserPermissions({ ...options }) {
  const showModal = useNotification({ isAuth: false });

  const { data, ...other } = useQuery(GET_USER_PERMISSIONS, {
    onError: pipe(prettyGraphQLErrors, runAfterInteractionHOF(showModal)),
    ...options,
  });

  const userPermissionsResult = { data: data?.[GET_USER_QUERY_NAME], ...other };

  return userPermissionsResult;
}
