import React from 'react'

import { useNavigation } from '@react-navigation/core'

import { isDefined } from 'utils/ramda'

import { ActionButton, Container, LogoImage, Message } from './castBase.styles'
import { TitleText, TitleContainer } from './creditsWelcome.styles'

const Title = ({ children }) => (
  <TitleContainer>
    <TitleText>{children}</TitleText>
  </TitleContainer>
)

interface CreditsBroadcastProps {
  logoUrl?: string
  message?: string
  title?: string
}

const CreditsWelcome = ({ logoUrl, title, message }: CreditsBroadcastProps) => {
  const navigation = useNavigation()
  return (
    <Container>
      {isDefined(logoUrl) && <LogoImage uri={logoUrl} />}
      <Title>{title}</Title>

      {!!message && <Message>{message}</Message>}

      <ActionButton onPressHandler={navigation.goBack}>
        {'PROCEED TO DASHBOARD'}
      </ActionButton>
    </Container>
  )
}

export default CreditsWelcome
