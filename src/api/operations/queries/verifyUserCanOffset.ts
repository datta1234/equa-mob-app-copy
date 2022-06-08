import { gql } from '@apollo/client';

export const VERIFY_USER_CAN_OFFSET_QUERY_NAME = 'VerifyUserCanOffset';
export const VERIFY_USER_CAN_OFFSET = gql`
  query ${VERIFY_USER_CAN_OFFSET_QUERY_NAME} {
    ${VERIFY_USER_CAN_OFFSET_QUERY_NAME} {
    canOffset
    hasCredit
    hasHabit
    hasSubscription
    message
    }
  }
`;
