import React from 'react';

import { Icon } from 'components';
import Button from 'components/Button';
import { BaseContainer } from 'components/Containers';
import {
  PortfolioStackNavigationProp,
  PortfolioStackRouteProp,
} from 'types/navigation';

import { Container, Title, Text } from './comingSoon.styles';

type Props = {
  route: PortfolioStackRouteProp<'ComingSoonScreen'>;
  navigation: PortfolioStackNavigationProp<'ComingSoonScreen'>;
};

const title =
  'Our integrated payments & \noffsets functionality is \ncoming soon!';
const body =
  'We’re pleased to see you are excited \nto offset your carbon emissions. You \nwill be updated with a new release \nwhen this feature is live!';

const defaultProps = {};
const ComingSoon = ({ navigation }: Props) => {
  const goBackToProjectDiscovery = () => {
    navigation.popToTop(); // back top of stack
    navigation.goBack(); // back to Bottom Tab navigator
  };

  return (
    <BaseContainer center>
      <Container>
        <Icon type={'tick'} color={'primary'} iconColor={'white'} size={70} />
        <Title center>{title}</Title>
        <Text center>{body}</Text>
        <Button onPressHandler={goBackToProjectDiscovery}>
          {'Back to project discovery'}
        </Button>
      </Container>
    </BaseContainer>
  );
};

ComingSoon.defaultProps = defaultProps;
export default ComingSoon;
