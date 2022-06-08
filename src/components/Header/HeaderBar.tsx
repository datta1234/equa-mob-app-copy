import React from 'react';

import styled from 'styled-components/native';

import { BackButton, CloseButton } from 'components/Button';
import useScaledSafeAreaInsets from 'hooks/useScaledSafeAreaInsets';

const HeaderBar = ({ back, close }) => {
  const insets = useScaledSafeAreaInsets();

  return (
    <Container insets={insets}>
      <Left>{back && <BackButton color={'light'} />}</Left>
      <Right>{close && <CloseButton color={'light'} />}</Right>
    </Container>
  );
};

export default HeaderBar;

const Container = styled.View`
  position: absolute;
  top: ${({ insets }) => 5 + insets.top + 'px'};
  z-index: 100;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 20px;
  /* padding-top: 5px; */
`;
const Left = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`;
const Right = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
`;
