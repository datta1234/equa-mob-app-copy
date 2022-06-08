import { gql } from '@apollo/client';

export const GET_REFRESH_TOKEN_QUERY_NAME = 'RefreshToken';

export const GET_REFRESH_TOKEN = gql`
  query GetRefreshToken($refreshToken: String!, $userId: String! ) {
    ${GET_REFRESH_TOKEN_QUERY_NAME}(input: { refreshToken: $refreshToken, userId: $userId }) {
      token {
        idToken
        expiresIn
        refreshToken
        accessToken
        tokenType
      }
    }
  }
`;
