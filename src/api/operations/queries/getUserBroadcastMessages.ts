import { gql } from '@apollo/client';

export const GET_USER_BROADCAST_MESSAGES_QUERY_NAME =
  'GetUserBroadcastMessages';

export const GET_USER_BROADCAST_MESSAGES = gql`
  query ${GET_USER_BROADCAST_MESSAGES_QUERY_NAME} {
    ${GET_USER_BROADCAST_MESSAGES_QUERY_NAME} {
      logoUrl
      message
      title
      typeId
      typeCode
    }
  }
`;
