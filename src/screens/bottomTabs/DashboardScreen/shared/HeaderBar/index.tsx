import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Avatar } from 'components';
// import { Icon } from 'components';
import useMainNav from 'hooks/navigation/useMainNav';

const HeaderBar = () => {
  const insets = useSafeAreaInsets();
  const goTo = useMainNav();

  return (
    <Container insets={insets}>
      <ItemsContainer>
        {/* <Icon color={'light'} type={'menu'} onPress={goTo.menu} /> */}
        <Avatar.Icon
          onPress={goTo.menu} //onPress={goTo.profile}
          color={'dark'}
        />
      </ItemsContainer>
    </Container>
  );
};

export default HeaderBar;

const Container = styled.View`
  position: absolute;
  top: ${({ insets }) => 5 + insets?.top + 'px'};
  z-index: 100;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 20px;
  padding-top: 5px;
`;
const ItemsContainer = styled.View`
  align-items: center;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;
