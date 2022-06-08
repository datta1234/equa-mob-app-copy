import React from 'react';

import { Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { BackButton } from 'components/Button/IconButtons';
import { SCREEN_WIDTH } from 'constants/layout';
import { isIOS } from 'utils/helpers';

const Container = styled.View`
  padding-top: 0px;
  padding-horizontal: 20px;
  /* align-items: center; */
`;

const SafeAreaTop = styled(SafeAreaView).attrs({ edges: ['top'] })``;

const Imaged = styled(Image)`
  height: 100px;
  width: ${SCREEN_WIDTH - 40 + 'px'};
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

const Header = ({ image }) => {
  return (
    <Container>
      {/* <SafeAreaTop />
      <BackButton
        color={'dark'}
        iconColor={'white'}
        style={{ marginTop: isIOS ? 5 : 15 }}
      /> */}
      {image?.typeCode === 'THUMBNAIL' && (
        <Imaged source={{ uri: image?.url }} />
      )}
    </Container>
  );
};

export default Header;
