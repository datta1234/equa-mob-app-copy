import { ReactNode } from 'react'
import { GestureResponderEvent } from 'react-native'


export interface ModalProps {
  onOverlayPress?: (event: GestureResponderEvent) => void
  children?: ReactNode | ReactNode[]
}