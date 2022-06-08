import React from 'react';

import { Container, Row, Text, ShieldImage } from './infoBox.styles';
const InfoBox = () => {
  return (
    <Container>
      <Row>
        <Text>{'All payments are securely made through Stripe'}</Text>
        <ShieldImage />
      </Row>
      <Text>
        {
          '*Please complete your payment within the \nnext 10 minutes to secure your offset'
        }
      </Text>
    </Container>
  );
};

export default InfoBox;
