import React from 'react';

import { ActivityIndicator } from 'react-native';

import { Text } from 'components/Typography';
import { carbonOffsetFormat } from 'utils/formats';

import {
  TotalContainer,
  TotalText,
  SumContainer,
  BlockContainer,
  EmissionsContainer,
} from './footprintBlock.styles';

const Total = ({ title, value }) => (
  <TotalContainer>
    <TotalText>{title}</TotalText>
    <Text fontSize={'h6'} bold color={'primary'}>
      {carbonOffsetFormat(value, { dec: 0 }) + ' kg'}
    </Text>
  </TotalContainer>
);

const Sum = ({ operator, final }) => (
  <SumContainer final={final}>
    <Text center color={'light'}>
      {operator}
    </Text>
  </SumContainer>
);

const Loading = () => <ActivityIndicator />;

const FootPrintBlock = ({ data, loading }) => {
  // if (loading) return <Loading />;

  const { totalKgCo2eEmissions, totalKgCo2eOffsets, totalKgCo2eFootprint } =
    data || {};

  return (
    <BlockContainer>
      <EmissionsContainer>
        <Total title={'Emissions'} value={totalKgCo2eEmissions?.valueRounded} />
        <Sum operator={'–'} />
        <Total title={'Offsets'} value={totalKgCo2eOffsets?.valueRounded} />
        <Sum final operator={'='} />
        <Total title={'Footprint'} value={totalKgCo2eFootprint?.valueRounded} />
      </EmissionsContainer>
      {/* <Text size={'tiny'}>*Offsets coming soon</Text> */}
    </BlockContainer>
  );
};

export default FootPrintBlock;
