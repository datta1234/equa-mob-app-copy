import { gql } from '@apollo/client';

export const GET_VIRTUAL_CART = gql`
  query GetVirtualCart {
    cart @client
  }
`;
