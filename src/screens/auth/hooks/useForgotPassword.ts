import { gql, useLazyQuery } from '@apollo/client';
import { pipe } from 'ramda';

import useNotification from 'hooks/useNotification';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';

const FORGOT_PASSWORD_QUERY_NAME = 'ForgotPassword';
const FORGOT_PASSWORD = gql`
  query ForgotPassword($email: String!) {
    ${FORGOT_PASSWORD_QUERY_NAME}(
      input: {
          emailAddress: $email
        }
    ) {
	success
  message
    }
  }
`;

export default function useForgotPassword({ ...options }) {
  const showNotification = useNotification({ isAuth: true });
  const onError = pipe(
    prettyGraphQLErrors,
    runAfterInteractionHOF(showNotification)
  );

  const [forgotPassword, forgotPasswordRes] = useLazyQuery(FORGOT_PASSWORD, {
    fetchPolicy: 'network-only',
    onError,
    ...options,
  });

  return [forgotPassword, forgotPasswordRes];
}
