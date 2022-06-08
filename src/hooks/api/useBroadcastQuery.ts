import { useQuery, useLazyQuery } from '@apollo/client';

import { GET_USER_BROADCAST_MESSAGES } from 'api/operations/queries/getUserBroadcastMessages';

function useBroadcastLazyQuery({ ...options }) {
  const [getBroadcastMessages, broadcastMessagesRes] = useLazyQuery(
    GET_USER_BROADCAST_MESSAGES,
    {
      fetchPolicy: 'network-only',
      ...options,
    }
  );

  return [getBroadcastMessages, broadcastMessagesRes];
}

function useBroadQuery({ ...options }) {
  const broadcastMessagesRes = useQuery(GET_USER_BROADCAST_MESSAGES, {
    fetchPolicy: 'network-only',
    ...options,
  });

  return broadcastMessagesRes;
}

useBroadQuery.Lazy = useBroadcastLazyQuery;

export default useBroadQuery;
