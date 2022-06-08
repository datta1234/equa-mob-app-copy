import React, { useState } from 'react';

import { not } from 'ramda';
import { Dimensions } from 'react-native';
import SideMenu from 'react-native-side-menu-updated';
import styled from 'styled-components/native';

import { Button, Typography } from 'components';
import useLogout from 'hooks/api/useLogout';

const window = Dimensions.get('window');

const Menu = ({ close }) => {
  const [logout, _, isLoggedIn] = useLogout();

  const onLogoutHandler = async () => {
    logout();
    close();
  };

  return (
    <MenuContainer>
      <HeaderBlock>
        <Typography.Title mode="dark">Developer menu</Typography.Title>
      </HeaderBlock>

      <FooterBlock>
        <Button
          mode="dark"
          onPressHandler={onLogoutHandler}
          isDisabled={not(isLoggedIn)}>
          Logout
        </Button>
      </FooterBlock>
    </MenuContainer>
  );
};

export default (WrappedComponent) => (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menu = <Menu close={() => setIsOpen(false)} />;

  return (
    <SideMenu
      menu={menu}
      menuPosition="right"
      isOpen={isOpen}
      onChange={setIsOpen}>
      <WrappedComponent {...props} />
    </SideMenu>
  );
};

const MenuContainer = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: ${window.height}px;
  padding: 50px;

  justify-content: space-between;

  background-color: ${({ theme, mode = 'light' }) => theme[mode].colors.dark};
`;

const MenuBlock = styled.View`
  padding: 25px;
`;

const FooterBlock = styled(MenuBlock)`
  flex: 1;
  justify-content: flex-end;
  padding-bottom: 15px;
`;

const HeaderBlock = styled(MenuBlock)`
  flex: 1;
  align-items: flex-end;
`;
