import React from 'react';

// import PropTypes from 'prop-types';
import { View } from 'react-native';

import { Typography } from 'components';

import {
  Container,
  ContentContainer,
  OffsetValue,
  HintWrapper,
} from './styles';

const propTypes = {};

const defaultProps = {};

function OffsetCounter({ partner }) {
  return (
    <Container>
      <View>
        <ContentContainer>
          <OffsetValue>0.48</OffsetValue>
          <Typography.Title>t C02e</Typography.Title>
        </ContentContainer>
      </View>

      <HintWrapper>
        <Typography.Text size="small">
          Free 3 months offset from {partner.businessName}
        </Typography.Text>
      </HintWrapper>
    </Container>
  );
}

OffsetCounter.defaultProps = defaultProps;
OffsetCounter.propTypes = propTypes;
export default OffsetCounter;
