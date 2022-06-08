import React from 'react';

import { gql, useQuery } from '@apollo/client';
import ForwardArrow from 'assets/svgs/ArrowIcon';

import Button from 'components/Button';
import useMainNav from 'hooks/navigation/useMainNav';

import {
  Container,
  Text,
  GreetingName,
  GreetingContainer,
  GetStartedContainer,
  GetStartedText,
  WelcomeBackContainer,
} from './welcomeBanner.styles';

const GET_USER_QUERY_NAME = 'GetUser';
const GET_USER = gql`
  query GetUser {
    ${GET_USER_QUERY_NAME} {
      id
      firstName
    }
  }
`;

const Greeting = () => {
  const { data: userResponse } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
  });
  const user = userResponse?.[GET_USER_QUERY_NAME] || {};
  return (
    <GreetingContainer>
      <Text color={'tertiary'} fontSize={'h5'}>
        Hi,
      </Text>
      <GreetingName color={'light'}>{user.firstName}</GreetingName>
    </GreetingContainer>
  );
};
const GetStarted = () => {
  const goTo = useMainNav();

  return (
    <GetStartedContainer>
      <GetStartedText>Add your emissions!</GetStartedText>
      <Button
        round
        onPressHandler={goTo.selectionActivity}
        color={'secondary'}
        textColor={'primary'}
        level={6}
        title={'Get started'}
        rightIcon={<ForwardArrow />}
      />
    </GetStartedContainer>
  );
};
const WelcomeBack = () => {
  return (
    <WelcomeBackContainer>
      <Text center color={'lightSecondary'}>
        {'Welcome back to \nyour dashboard'}
      </Text>
    </WelcomeBackContainer>
  );
};

const Welcome = ({ isProfileCompleted }) => {
  return (
    <Container>
      <Greeting />
      {isProfileCompleted ? <WelcomeBack /> : <GetStarted />}
    </Container>
  );
};

export default Welcome;
