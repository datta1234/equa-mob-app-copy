import { gql } from '@apollo/client';

export const GET_ACTIVE_USER_CREDIT_QUERY_NAME = 'GetActiveUserCredit';

export const GET_ACTIVE_USER_CREDIT = gql`
  query ${GET_ACTIVE_USER_CREDIT_QUERY_NAME} {
    ${GET_ACTIVE_USER_CREDIT_QUERY_NAME} {
      activationDateTime
      balanceKgCo2e
      emailAddress
      expirationDateTime
      id
      portfolio {
        id
        media {
          id
          format
          mediaId
          portfolioId
          typeCode
          url
        }    
      }
      reference
      totalKgCo2e
    }
  }
`;
