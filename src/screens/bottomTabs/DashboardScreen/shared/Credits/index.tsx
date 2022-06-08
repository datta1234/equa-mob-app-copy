import React from 'react';

import { useQuery } from '@apollo/client';

import {
  GET_ACTIVE_USER_CREDIT,
  GET_ACTIVE_USER_CREDIT_QUERY_NAME,
} from 'api/operations/queries/getActiveUserCredit';
import { getInOr } from 'utils/ramda';

import CreditsBlock from './CreditsBlock';

export default (props) => {
  const { data } = useQuery(GET_ACTIVE_USER_CREDIT, {
    fetchPolicy: 'cache-and-network',
  });

  const userCreditData = data?.[GET_ACTIVE_USER_CREDIT_QUERY_NAME] || {};

  return (
    <CreditsBlock
      {...props}
      credits={getInOr(0, ['balanceKgCo2e'], userCreditData)}
      portfolio={getInOr({}, ['portfolio'], userCreditData)}
      expiryDate={getInOr(null, ['expirationDateTime'], userCreditData)}
    />
  );
};
