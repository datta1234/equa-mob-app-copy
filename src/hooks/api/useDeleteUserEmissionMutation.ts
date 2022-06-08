import { gql, useMutation } from '@apollo/client';

import { GET_ACTIVE_USER_CREDIT_QUERY_NAME } from 'api/operations/queries/getActiveUserCredit';
import { GET_ACTIVITIES_QUERY_NAME } from 'api/operations/queries/getActivities';
import { GET_INFOGRAPHIC_EMISSIONS_QUERY_NAME } from 'api/operations/queries/getInfographicEmissions';
import { GET_SUBSCRIPTION_IMAGE } from 'api/operations/queries/getSubscriptionImage';
import { GET_USER_PROGRESS_QUERY_NAME } from 'api/operations/queries/getUserProgress';

export const DUE_MUTATION_NAME = 'DeleteUserEmission';
const DELETE_USER_EMISSION = gql`
  mutation DeleteUserEmission($id: Uuid!) {
    ${DUE_MUTATION_NAME}(
      input: {
        id: $id
      }
    ) {
	success
	message
	errors
      }
    }
`;

export default function useDeleteEmissionMutation({ ...options }) {
  const [deleteUserEmission, deleteUserEmissionRes] = useMutation(
    DELETE_USER_EMISSION,
    {
      refetchQueries: [
        GET_ACTIVE_USER_CREDIT_QUERY_NAME,
        GET_ACTIVITIES_QUERY_NAME,
        GET_INFOGRAPHIC_EMISSIONS_QUERY_NAME,
        GET_USER_PROGRESS_QUERY_NAME,
        { query: GET_SUBSCRIPTION_IMAGE },
      ],
      ...options,
    }
  );

  return [deleteUserEmission, deleteUserEmissionRes];
}
