import { gql, useLazyQuery } from '@apollo/client';

export const LOGOUT_QUERY_NAME = 'Logout';
const LOGOUT = gql`
  query Logout($refreshToken: String!) {
    ${LOGOUT_QUERY_NAME}(input: { refreshToken: $refreshToken }) {
      success
      message
    }
  }
`;

export default function useLogoutLazyQuery({ ...options }) {
  const [logout, logoutRes] = useLazyQuery(LOGOUT, {
    fetchPolicy: 'network-only',
    ...options,
  });

  return [logout, logoutRes];
}
