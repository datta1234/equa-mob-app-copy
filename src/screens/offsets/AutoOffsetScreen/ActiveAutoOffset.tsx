import React from 'react';

import { images } from 'assets';
import SmileyIcon from 'assets/svgs/offsets/SmileyIcon';
import { Image } from 'react-native';

import { Icon } from 'components/';
import { RootContainer as ScreenContainer } from 'components/Containers';

import useOffsetNav from '../hooks/useOffsetNav';

import {
  Container,
  Title,
  SubTitle,
  Text,
  InfoBoxContainer,
  InfoTextCont,
  IconContainer,
  EditText,
  InfoText,
  StatusCont,
  StatusText,
} from './activeAutoOffset.styles';

const screenTitle = 'ACTIVE OFFSETS';

const title1 = 'Add more activities!';
const title2 = 'Add more activities!';
const title3 = 'Add more activities!';
const title4 = 'Congratulations!';
const subTitle1 = '';
const subTitle2 = '';
const subTitle3 = 'You’re almost carbon neutral!';
const subTitle4 = 'You’re carbon neutral!';
const body1 =
  'You have taken the first step towards becoming climate neutral by measuring and offsetting your carbon emissions.  \n\nReturn to your dashboard to complete your emissions profile in order to progress. ';
const body2 =
  'You have made great progress towards becoming climate neutral by measuring and offsetting your carbon emissions.  \n\nReturn to your dashboard to complete your emissions profile in order to reach carbon neutrality.';
const body3 =
  'Return to your dashboard to complete your profile in order to reach carbon neutrality.';
const body4 =
  'Make sure you keep your profile up to date, adding any additional emissions where necessary in order to maintain your carbon neutral status.';

const chooseCopy = (progress) => {
  if (progress <= 25) {
    return { title: title1, subTitle: subTitle1, body: body1 };
  }
  if (progress <= 50) {
    return { title: title2, subTitle: subTitle2, body: body2 };
  }
  if (progress <= 75) {
    return { title: title3, subTitle: subTitle3, body: body3 };
  } else {
    return { title: title4, subTitle: subTitle4, body: body4 };
  }
};
const chooseGauge = (progress) => {
  if (progress <= 25) {
    return images.gauge.GAUGE_LEVEL_1;
  }
  if (progress <= 50) {
    return images.gauge.GAUGE_LEVEL_2;
  }
  if (progress <= 75) {
    return images.gauge.GAUGE_LEVEL_3;
  } else {
    return images.gauge.GAUGE_FULL;
  }
};

const Status = ({ status }) => (
  <StatusCont>
    <StatusText>{status}</StatusText>
  </StatusCont>
);

const InfoBox = ({ onEditPress }) => (
  <InfoBoxContainer>
    <InfoTextCont>
      <InfoText>
        {'Your Auto Offset is currently set to  '}
        <Status status={'Active'} />
      </InfoText>
    </InfoTextCont>
    <IconContainer>
      <EditText>Edit</EditText>
      <Icon type={'edit'} color={'light'} onPress={onEditPress} />
    </IconContainer>
  </InfoBoxContainer>
);

const ActiveAutoOffset = ({ portfolio, progress }) => {
  const goTo = useOffsetNav();

  const { title, subTitle, body } = chooseCopy(progress);
  const gaugeSource = chooseGauge(progress);

  const backImageUrl = portfolio?.media?.find(
    (media) => media?.typeCode === 'THUMBNAIL'
  )?.url;

  const goToSubscriptionOverviewScreen = () =>
    goTo.subscriptionOverview({
      portfolioId: portfolio?.id,
      isActive: true,
    });
  return (
    <ScreenContainer
      headerImageSource={{ uri: backImageUrl }}
      close
      title={screenTitle}
      header={<Image style={{ marginBottom: -114 }} source={gaugeSource} />}>
      <Container>
        <SmileyIcon />
        <Title center>{title}</Title>
        <SubTitle center>{subTitle}</SubTitle>
        <Text center>{body}</Text>
      </Container>
      <InfoBox onEditPress={goToSubscriptionOverviewScreen} />
    </ScreenContainer>
  );
};

export default ActiveAutoOffset;
