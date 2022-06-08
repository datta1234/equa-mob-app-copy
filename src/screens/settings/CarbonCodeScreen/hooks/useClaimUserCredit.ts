import { gql, useMutation } from '@apollo/client';
import { pipe } from 'ramda';

import useNotification from 'hooks/useNotification';
import { prettyGraphQLErrors } from 'utils/formats';
import { runAfterInteractionHOF } from 'utils/helpers';
import { getIn, getInOr } from 'utils/ramda';

const CLAIM_USER_CREDIT_MUTATION_NAME = 'ClaimUserCredit';
const CLAIM_USER_CREDIT = gql`
  mutation ClaimUserCredit($voucherCode: String!, $emailAddress: String ) {
    ${CLAIM_USER_CREDIT_MUTATION_NAME}(
	input: {
	  voucherCode: $voucherCode
	  emailAddress: $emailAddress
	}) {
	success
	type
	title
	message
	errors
    }
  }
`;

export default function useClaimUserCredit({ ...options }) {
  const showModal = useNotification({ isAuth: false });

  const showSuccess = ({ success, message }) =>
    success
      ? showModal({ type: 'success', title: 'Success', subtitle: message })
      : null;

  const [claimUserCredit, { data, ...other }] = useMutation(CLAIM_USER_CREDIT, {
    onError: pipe(prettyGraphQLErrors, runAfterInteractionHOF(showModal)),
    onCompleted: pipe(
      getInOr({}, CLAIM_USER_CREDIT_MUTATION_NAME),
      showSuccess,
    ),
    ...options,
  });

  const claimUserCreditResult = {
    data: data?.[CLAIM_USER_CREDIT_MUTATION_NAME],
    ...other,
  };

  return [claimUserCredit, claimUserCreditResult] as const;
}
