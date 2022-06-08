import { gql } from '@apollo/client';

export const GET_PROJECT = gql`
  query Project($id: ID!) {
    project(id: $id) {
      id
    }
  }
`;
