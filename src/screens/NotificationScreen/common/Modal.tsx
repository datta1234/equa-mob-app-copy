import React from 'react'

import { Container, ContentContainer, GoBackOverlay } from './modal.styles'
import { ModalProps } from './types'

const defaultProps = {}
function Modal({ onOverlayPress, children }: ModalProps) {
  return (
    <Container>
      <GoBackOverlay onPress={onOverlayPress} />
      <ContentContainer>{children}</ContentContainer>
    </Container>
  )
}

Modal.defaultProps = defaultProps
export default Modal
