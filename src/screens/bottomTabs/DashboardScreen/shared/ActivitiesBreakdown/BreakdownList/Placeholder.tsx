import React from 'react';

import { images } from 'assets';
import { Button, Icon } from 'components';
import useMainNav from 'hooks/navigation/useMainNav';

import {
  Container,
  Background,
  Title,
  ButtonContainer,
} from './placeholder.styles';

const propTypes = {};

const defaultProps = {};

function Placeholder({ type }) {
  const goTo = useMainNav();

  const goToSelectionActivity = () => goTo.addActivity(type);

  return (
    <Container>
      <Background
        source={images.TREES_SOLID_BG}
        resizeMode={'contain'}
        // overflow={'visible'}
      >
        <Icon type={'bell'} color={'dark'} />
        <Title>{`You currently do not have any \n${type.toLowerCase()} activities added`}</Title>
        <ButtonContainer>
          <Button
            round
            color={'dark'}
            fontSize={'h8'}
            onPressHandler={goToSelectionActivity}>
            {`Add ${type} activity`}
          </Button>
        </ButtonContainer>
      </Background>
    </Container>
  );
}

Placeholder.defaultProps = defaultProps;
Placeholder.propTypes = propTypes;
export default Placeholder;
