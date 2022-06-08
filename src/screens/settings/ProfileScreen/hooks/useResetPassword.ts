import { gql, useLazyQuery } from '@apollo/client';
import { pipe } from 'ramda';

import useNotification from 'hooks/useNotification';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';

const RESET_PASSWORD_QUERY_NAME = 'ResetPassword';
const RESET_PASSWORD = gql`
  query ResetPassword{
    ${RESET_PASSWORD_QUERY_NAME}
     {
      success
      message
    }
  }
`;

export default function useResetPassword({ ...options }) {
  const showModal = useNotification({ isAuth: false });
  const onError = pipe(prettyGraphQLErrors, runAfterInteractionHOF(showModal));

  const [resetPassword, resetPasswordRes] = useLazyQuery(RESET_PASSWORD, {
    fetchPolicy: 'network-only',
    onError,
    ...options,
  });

  return [resetPassword, resetPasswordRes];
}
