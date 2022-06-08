import { BroadcastTypeCodesValue } from 'models/Broadcasts'
import React from 'react'

import { chooseBroadcastNode } from './utils'

interface BroadcastProps {
  typeCode: BroadcastTypeCodesValue
}

const Broadcast = ({ typeCode, ...castProps }: BroadcastProps) => {
  const { title, typeId, message, logoUrl } = castProps

  const BroadcastContent = chooseBroadcastNode(typeCode)
  if (!BroadcastContent) return null

  return <BroadcastContent {...castProps} />
}

export default Broadcast
