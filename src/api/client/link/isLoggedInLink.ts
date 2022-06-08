import { setContext } from '@apollo/client/link/context';

import { client } from 'api/client/client';

import { IS_LOGGED_IN } from '../../operations/queries/getIsLoggedIn';

const isLoggedInLink = setContext(async (request, context) => {
  const {
    data: { isLoggedIn },
  } = await client.query({
    query: IS_LOGGED_IN,
  });

  return { isLoggedIn };
});

export default isLoggedInLink;
