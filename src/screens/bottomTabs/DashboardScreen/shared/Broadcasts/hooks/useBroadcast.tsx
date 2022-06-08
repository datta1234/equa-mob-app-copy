import React, { isValidElement, useCallback, useState } from 'react'

import { useQuery } from '@apollo/client'
import { useFocusEffect } from '@react-navigation/native'

import { client } from 'api/client/client'
import { GET_ACTIVE_USER_CREDIT } from 'api/operations/queries/getActiveUserCredit'
import {
  GET_USER_BROADCAST_MESSAGES,
  GET_USER_BROADCAST_MESSAGES_QUERY_NAME,
} from 'api/operations/queries/getUserBroadcastMessages'
import useBroadQuery from 'hooks/api/useBroadcastQuery'
import useNotification from 'hooks/useNotification'
import { isNotDefined } from 'utils/ramda'

import Broadcast from '../Broadcast'

const mockData = [
  {
    typeCode: 'INSURANCE_ACTIVATION',
    logoUrl: '',
    title: '',
    subTitle: 'Congratulations!',
    estimateMessage: 'The estimated annual emissions for your Volkswagen are:',
    estimateValue: '2.65 tCO2e',
    message: `By purchasing your policy from Hastings Direct your car is now carbon neutral for the next 3 months!

  To continue your carbon neutral journey, proceed to the dasboard and add other travel, home, food and purchasing activities.`,
  },
  {
    typeCode: 'CREDIT_ACTIVATION',
    logoUrl: '',
    title: 'success',
    message: 'Some message',
  },
] as const

export default function useBroadcast() {
  // const [getBroadcastMessages, broadcastMessagesRes] = useBroadQuery.Lazy();
  // const { data, loading, refetch } = useBroadQuery();
  const { data, loading, refetch } = useQuery(GET_USER_BROADCAST_MESSAGES, {
    fetchPolicy: 'network-only',
  })
  // const [mockDataRef, setMockDataRef] = useState(mockData)
  // Check for broadcast every time user visits dashboard
  const fetchData = useCallback(async () => {
    await client.query({
      query: GET_ACTIVE_USER_CREDIT,
      fetchPolicy: 'network-only',
    })
    refetch()
  }, [refetch])

  useFocusEffect(
    useCallback(() => {
      fetchData()
      // setMockDataRef(mockData)
    }, [fetchData]),
  )
  //TODO: update to not use notification screen but custom modal. broadcastMessages.map()=>{return array of modals}
  const showModal = useNotification()

  if (loading || !data) return null
  const broadcastMessages = data?.[GET_USER_BROADCAST_MESSAGES_QUERY_NAME]
  // const broadcastMessages = mockDataRef || []

  if (isNotDefined(broadcastMessages)) return null

  broadcastMessages?.map((broadcastProps) => {
    console.log('Found broadcast', broadcastProps?.typeCode)

    const broadcast = Broadcast({ ...broadcastProps })
    if (!isValidElement(broadcast)) return null

    showModal({
      close: true,
      navType: 'push',
      renderNode: () => broadcast,
    })
  })
}

// const Broadcast = () => chooseBroadcastNode(typeCode)(castProps);
