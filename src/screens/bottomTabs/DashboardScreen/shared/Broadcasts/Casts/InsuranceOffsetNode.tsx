import React from 'react'

import { useNavigation } from '@react-navigation/native'

import { isDefined } from 'utils/ramda'

import { ActionButton, Container, LogoImage, Message } from './castBase.styles'
import {
  EstimateBoarder,
  EstimateContainer,
  EstimateMessage,
  EstimateValue,
  SubTitleText,
} from './insuranceOffset.styles'

type EstimateOffsetProps = {
  estimateMessage: React.ReactNode
  estimateValue: React.ReactNode
}

type CreditsWelcomeProps = {
  logoUrl?: string
  estimateMessage: string
  estimateValue: string
  subTitle: string
  message?: string
}

const EstimateOffset = ({
  estimateMessage,
  estimateValue,
}: EstimateOffsetProps) => (
  <EstimateBoarder>
    <EstimateContainer>
      <EstimateMessage>{estimateMessage}</EstimateMessage>
      <EstimateValue>{estimateValue}</EstimateValue>
    </EstimateContainer>
  </EstimateBoarder>
)

const InsuranceOffsetNode = ({
  logoUrl,
  estimateMessage,
  estimateValue,
  subTitle,
  message,
}: CreditsWelcomeProps) => {
  const navigation = useNavigation()
  return (
    <Container>
      {isDefined(logoUrl) && <LogoImage uri={logoUrl} />}
      <EstimateOffset
        estimateMessage={estimateMessage}
        estimateValue={estimateValue}
      />
      <SubTitleText>{subTitle}</SubTitleText>

      {!!message && <Message>{message}</Message>}

      <ActionButton onPressHandler={navigation.goBack}>
        {'PROCEED TO DASHBOARD'}
      </ActionButton>
    </Container>
  )
}

export default InsuranceOffsetNode
