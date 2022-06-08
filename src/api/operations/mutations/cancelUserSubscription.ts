import { gql } from '@apollo/client';

export const CANCEL_USER_SUBSCRIPTION_MUTATION_NAME = 'CancelUserSubscription';

export const CANCEL_USER_SUBSCRIPTION = gql`
  mutation ${CANCEL_USER_SUBSCRIPTION_MUTATION_NAME}($subscriptionId: Uuid!) {
    ${CANCEL_USER_SUBSCRIPTION_MUTATION_NAME}(input: {subscriptionId: $subscriptionId }) {
      success
      message
    }
  }
`;
