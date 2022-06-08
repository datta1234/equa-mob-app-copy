import React from 'react'

import {
  Container,
  ContentContainer,
  GoBackOverlay,
  HeaderContainer,
  PullTargetBar,
} from './drawerModal.styles'
import { ModalProps } from './types'

const defaultProps = {}

function DrawerModal({ onOverlayPress, children }: ModalProps) {
  return (
    <Container>
      <GoBackOverlay onPress={onOverlayPress} />
      <ContentContainer>
        <HeaderContainer>
          <PullTargetBar />
        </HeaderContainer>
        {children}
      </ContentContainer>
    </Container>
  )
}

DrawerModal.defaultProps = defaultProps
export default DrawerModal
