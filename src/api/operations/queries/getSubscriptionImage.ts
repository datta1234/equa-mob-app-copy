import { gql } from '@apollo/client';

export const GET_SUBSCRIPTIONS_IMAGE_QUERY_NAME = 'GetUserSubscriptions';

export const GET_SUBSCRIPTION_IMAGE = gql`
  query ${GET_SUBSCRIPTIONS_IMAGE_QUERY_NAME} {
    ${GET_SUBSCRIPTIONS_IMAGE_QUERY_NAME} {
      id
      portfolio {
        id
        media {
          format
          id
          mediaId
          typeCode
          url
        }
      }
    }
  }
`;
