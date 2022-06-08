import React from 'react';

import { images } from 'assets';
import QuestionIcon from 'assets/svgs/offsets/QuestionmarkIcon';
import { Image } from 'react-native';
import { Linking } from 'react-native';

import { RootContainer as ScreenContainer } from 'components/Containers';

import useOffsetNav from '../hooks/useOffsetNav';

import Gauge from './Gauge';

import {
  Container,
  Title,
  Text,
  SubscribeButton,
  ClearButton,
} from './subAutoOffset.styles';

const screenTitle = 'PURCHASE OFFSETS';
const title = 'Reducing your footprint';
const info =
  'Become carbon neutral by subscribing to auto offsetting. You will contribute to a portfolio of projects which will deliver positive climate impact.';
const disclaimer =
  'You will be charged a monthly amount based on your measured emissions for each month.';

const SubAutoOffset = ({ selectedPortfolioId }) => {
  const goTo = useOffsetNav();

  const gaugeSource = images.gauge.GAUGE_EMPTY;

  const goToNext = () => {
    selectedPortfolioId //if user entered offsets having already selected a portfolio
      ? goTo.subscriptionOverview({
          portfolioId: selectedPortfolioId,
          isActive: false,
        })
      : goTo.portfolioSelection();
  };
  return (
    <ScreenContainer
      close
      title={screenTitle}
      // header={<Gauge.Empty style={{ marginBottom: -114 }} />}
      header={<Image source={gaugeSource} style={{ marginBottom: -114 }} />}>
      <Container>
        <QuestionIcon />
        <Title>{title}</Title>
        <Text>{info}</Text>
        <Text bold fontSize={'h7'}>
          {disclaimer}
        </Text>
        <SubscribeButton onPressHandler={goToNext}>
          {'Subscribe to auto-offset'}
        </SubscribeButton>
        <ClearButton
          text={'What is offsetting?'}
          onPress={() =>
            Linking.openURL(
              'https://www.aq-greentec.com/solutions/carbon-management-solutions/offsetting-ghg-compensation/'
            )
          }
        />
      </Container>
    </ScreenContainer>
  );
};

export default SubAutoOffset;
