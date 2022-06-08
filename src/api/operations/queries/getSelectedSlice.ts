import { gql } from '@apollo/client';

export const GET_SELECTED_SLICE = gql`
  query GetSelectedSlice {
    selectedSlice @client
  }
`;
