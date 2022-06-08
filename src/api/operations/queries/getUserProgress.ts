import { gql } from '@apollo/client';

export const GET_USER_PROGRESS_QUERY_NAME = 'GetUserProgress';

export const GET_USER_PROGRESS = gql`
  query ${GET_USER_PROGRESS_QUERY_NAME} {
    ${GET_USER_PROGRESS_QUERY_NAME} {
      id,
      typeCode,
      typeTitle,
      isCompleted
    }
  }
`;
