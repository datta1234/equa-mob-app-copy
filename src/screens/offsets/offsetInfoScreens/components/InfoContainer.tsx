import React from 'react';

import { RootContainer as ScreenContainer } from 'components/Containers';

import {
  Container,
  Title,
  Text,
  FooterContainer,
} from './infoContainer.styles';

const InfoContainer = ({
  screenTitle,
  icon,
  title,
  bodyText,
  children,
  footer,
}) => {
  return (
    <ScreenContainer center title={screenTitle ?? 'AUTO OFFSETS'}>
      <Container>
        {icon}
        {title && <Title center>{title}</Title>}
        {bodyText && <Text center>{bodyText}</Text>}
        {children}
      </Container>
      <FooterContainer>{footer}</FooterContainer>
    </ScreenContainer>
  );
};

export default InfoContainer;
