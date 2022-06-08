import React from 'react'
import { Linking, ViewProps } from 'react-native'

import styled from 'styled-components/native'

import { ClickableText } from 'components/Typography'
import links from 'constants/links'
import { StyledContainerProps } from 'types/styled'

export const LegalContainer = styled.View<StyledContainerProps>`
  margin-horizontal: ${({ withHorizontal = true }) =>
    withHorizontal ? '30px' : 0};
  margin-vertical: ${({ withVertical = true }) => (withVertical ? '15px' : 0)};
`

interface Props {
  style?: ViewProps
}

const LegalLinks = ({ style }: Props) => {
  return (
    <LegalContainer style={style}>
      <ClickableText
        make={['bold', 'underline']}
        size={'tiny'}
        mode={'dark'}
        style={{ marginBottom: 8 }}
        center
        uppercase
        onPress={() => {
          Linking.openURL(links.termsOfUse)
        }}>
        Terms and Conditions
      </ClickableText>
      <ClickableText
        make={['bold', 'underline']}
        size={'tiny'}
        mode={'dark'}
        center
        uppercase
        onPress={() => {
          Linking.openURL(links.privacyPolicy)
        }}>
        Privacy Policy
      </ClickableText>
    </LegalContainer>
  )
}

export default LegalLinks
